import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from "react-router-dom";

import NotFound from '../../components/NotFound/NotFound'
import NavFootPatient from '../../components/NavFoot/NavFootPatient'
import NavFootDoc from '../../components/NavFoot/NavFootDoc'

import {patientNav, patientRoute} from '../../router/patient'
import {doctorNav, doctorRoute} from "../../router/doctor";

import {getUser} from "../../redux/user/actions";
import {getPatientList, getLabelList} from "../../redux/doctor/actions";

import Cookies from 'js-cookie';

class Main extends Component {
	state = {
		type: 'doctor',
	};

	componentDidMount() {
		const token = Cookies.get('token');
		if (token) {
			this.props.getPatientList(token);
			this.props.getLabelList(token);
		}
	}

	render() {
		// 讲当前 地址 写入 本地缓存 供后期使用
		sessionStorage.path = this.props.location.pathname;

		const {identity, phone} = this.props.user;
		const {pathname} = this.props.location;
		const route = identity === 'patient' ? patientRoute : doctorRoute;
		const nav = identity === 'patient' ? patientNav : doctorNav;
		const showNav = nav.some(nav => nav.pathname === pathname);

		if (!phone || !identity) {
			return <Redirect to={'/login'}/>
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
					showNav ?
						identity === 'patient' ? <NavFootPatient navs={nav}/> : < NavFootDoc doctorNav={nav}/>
						: null
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
	{
		getUser,
		getPatientList,
		getLabelList
	}
)(Main);

