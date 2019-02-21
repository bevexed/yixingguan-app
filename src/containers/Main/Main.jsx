import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from "react-router-dom";

import NotFound from '../../components/NotFound/NotFound'
import NavFootPatient from '../../components/NavFoot/NavFootPatient'
import NavFootDoc from '../../components/NavFoot/NavFootDoc'

import PatientIndex from '../PatientIndex/PatientIndex'
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
			component: PatientIndex
		},
		{
			pathname: '/doc',
			path: '',
			isActive: false,
			icon: 'doc.svg',
			selectedIcon: 'doc.svg',
			component: Doctors
		},
		{
			pathname: '/personal',
			path: '我的',
			isActive: false,
			icon: 'my.svg',
			selectedIcon: 'my-s.svg',
			component: Personal
		},
	];

	patientNav = [
		{
			pathname: '/doctor-index',
			path: '患者',
			isActive: false,
			icon: 'patient-@3x.png',
			selectedIcon: 'patient-s@3x.png',
			component: Personal
		}, {
			pathname: '/patient-detail',
			path: '我的',
			isActive: false,
			icon: 'my.svg',
			selectedIcon: 'my-s.svg',
			component: Personal
		}
	];

	render() {
		const {type,phone} = this.props.user;
		if (!type) {
			return <Redirect to={getRedirectTo(type, phone)}/>
		}

		return (
			<div>
				<Switch>
					{
						this.navs.map(nav =>
							<Route key={nav.pathname} path={nav.pathname} component={nav.component}/>
						)
					}
					<Route path='/order-doc/:docId' component={OrderDoc}/>
					<Route path='/message/:to' component={Message}/>
					<Route component={NotFound}/>
				</Switch>
				{
					type === 'doctor' ?
						this.navs.some(nav => nav.pathname === this.props.location.pathname) ? <NavFootPatient navs={this.navs}/> : null
						: < NavFootDoc patientNav={this.patientNav}/>
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

