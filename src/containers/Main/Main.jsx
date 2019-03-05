import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from "react-router-dom";

import NotFound from '../../components/NotFound/NotFound'
import NavFootPatient from '../../components/NavFoot/NavFootPatient'
import NavFootDoc from '../../components/NavFoot/NavFootDoc'

import {patientNav, patientRoute} from '../../router/patient'
import {doctorNav, doctorRoute} from "../../router/doctor";

import {getWxCode, getUser} from "../../redux/user/actions";
import {getPatientList,getLabelList} from "../../redux/doctor/actions";

import {getRedirectTo} from "../../utils";

import Cookies from 'js-cookie';

class Main extends Component {
	state = {
		type: 'doctor',

	};


	componentWillMount() {
		const token = Cookies.get('token');

		if (!token) {
			getWxCode(this.props.getUser)
		} else {
			const callbacks = [
				this.props.getPatientList,
				this.props.getLabelList
			];
			this.props.getUser(token, callbacks);
		}
	}

	render() {
		const token = Cookies.get('token');
		const {identity, phone} = this.props.user;
		const {pathname} = this.props.location;
		const route = identity === 'patient' ? patientRoute : doctorRoute;
		const nav = identity === 'patient' ? patientNav : doctorNav;
		const showNav = nav.some(nav => nav.pathname === pathname);


		// 没有token 拦截 到相应 注册 页面
		if (!token) {
			return <Redirect to={getRedirectTo(identity, phone)}/>
		}

		// 重定向 '/' 到 指定的 home 页面
		if (pathname === '/') {
			return <Redirect to={getRedirectTo(identity, phone)}/>
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

