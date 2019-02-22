import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from "react-router-dom";

import NotFound from '../../components/NotFound/NotFound'
import NavFootPatient from '../../components/NavFoot/NavFootPatient'
import NavFootDoc from '../../components/NavFoot/NavFootDoc'

import PatientIndex from '../PatientIndex/PatientIndex'
import DoctorIndex from '../DoctorIndex/DoctorIndex';
import Personal from "../PersonalDoc/PersonalPatient";
import OrderDoc from '../OrderDoc/OrderDoc'
import Doctors from '../Doctors/Doctors'

import Message from '../Message/Message'

import {getRedirectTo} from "../../utils";

class Main extends Component {
	state = {
		type: 'doctor'
	};

	navs = [
		{
			pathname: '/patient-index',
			path: '首页',
			isActive: false,
			icon: 'home.svg',
			selectedIcon: 'home-s.svg',
			component: PatientIndex,
			show: true
		},
		{
			pathname: '/doc',
			path: '',
			isActive: false,
			icon: 'doc.svg',
			selectedIcon: 'doc.svg',
			component: Doctors,
			show: true
		},
		{
			pathname: '/patient-detail',
			path: '我的',
			isActive: false,
			icon: 'my.svg',
			selectedIcon: 'my-s.svg',
			component: Personal,
			show: true
		},
		{
			pathname: '/order-doc/:docId',
			component: OrderDoc,
		},
		{
			pathname: '/message/:to',
			component: Message,
		}
	];

	doctorNav = [
		{
			pathname: '/doctor-index',
			path: '患者',
			isActive: false,
			icon: 'patient-@3x.png',
			selectedIcon: 'patient-s@3x.png',
			component: DoctorIndex,
			show: true
		},
		{
			pathname: '/doctor-detail',
			path: '我的',
			isActive: false,
			icon: 'my.svg',
			selectedIcon: 'my-s.svg',
			component: Personal,
			show: true
		}
	];

	render() {
		const {type, phone} = this.props.user;
		console.log(1);
		if (!type) {
			return <Redirect to={getRedirectTo(type, phone)}/>
		}

		return (
			<div>
				<Switch>
					{type === 'patient' ?
						this.navs.map(nav =>
							<Route key={nav.pathname} path={nav.pathname} component={nav.component}/>
						)
						:
						this.doctorNav.map(nav =>
							<Route key={nav.pathname} path={nav.pathname} component={nav.component}/>
						)
					}
					<Route component={NotFound}/>
				</Switch>
				{
					type === 'patient' ?
						this.navs.some(nav => nav.show) ? <NavFootPatient navs={this.navs}/> : null
						: this.doctorNav.some(nav => nav.show) ? < NavFootDoc doctorNav={this.doctorNav}/> : null
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(
	mapStateToProps,
)(Main);

