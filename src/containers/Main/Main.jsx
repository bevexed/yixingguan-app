import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from "react-router-dom";

import NotFound from '../../components/NotFound/NotFound'
import NavFootPatient from '../../components/NavFoot/NavFootPatient'
import NavFootDoc from '../../components/NavFoot/NavFootDoc'

import PatientIndex from '../Index/PatientIndex'
import DoctorIndex from '../Index/DoctorIndex';
import PersonalPatient from "../Personal/PersonalPatient";
import PersonalDoctor from "../Personal/PersonalDoctor";
import OrderDoc from '../OrderDoc/OrderDoc'
import Doctors from '../Doctors/Doctors'
import NewPatient from '../NewPatient/NewPatient'
import Message from '../Message/Message'
import DoctorCompleteInformation from '../CompleteInformation/DoctorCompleteInformation'
import DoctorDetail from '../Detail/DoctorDetail'

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
		},
		{
			pathname: '/doc',
			path: '',
			isActive: false,
			icon: 'doc.svg',
			selectedIcon: 'doc.svg',
			component: Doctors,
		},
		{
			pathname: '/patient-personal',
			path: '我的',
			isActive: false,
			icon: 'my.svg',
			selectedIcon: 'my-s.svg',
			component: PersonalPatient,
		},
	];

	patientRoute = [
		...this.navs,
		{
			pathname: '/order-doc/:docId',
			component: OrderDoc,
		},
		{
			pathname: '/message/:to',
			component: Message,
		},
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
			pathname: '/doctor-personal',
			path: '我的',
			isActive: false,
			icon: 'my.svg',
			selectedIcon: 'my-s.svg',
			component: PersonalDoctor,
			show: true
		}
	];

	doctorRoute = [
		...this.doctorNav,
		{
			pathname: '/new-patient',
			component: NewPatient
		},
		{
			pathname: '/doctor-complete-information',
			component: DoctorCompleteInformation
		},
		{
			pathname: '/doctor-detail',
			component: DoctorDetail
		}
	];

	render() {
		const {type, phone} = this.props.user;
		const route = type === 'patient' ? this.patientRoute : this.doctorRoute;

		if (!type) {
			return <Redirect to={getRedirectTo(type, phone)}/>
		}

		return (
			<div>
				<Switch>
					{
						route.map(nav =>
							<Route key={nav.pathname} path={nav.pathname} component={nav.component}/>
						)
					}
					<Route component={NotFound}/>
				</Switch>
				{
					type === 'patient' ?
						this.navs.some(nav => nav.pathname === this.props.location.pathname) ? <NavFootPatient navs={this.navs}/> : null
						: this.doctorNav.some(nav => nav.pathname === this.props.location.pathname) ? < NavFootDoc doctorNav={this.doctorNav}/> : null
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

