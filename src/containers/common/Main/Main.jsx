import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from "react-router-dom";

import NotFound from '../NotFound/NotFound'
import NavFootPatient from '../../../components/NavFoot/NavFootPatient'
import NavFootDoc from '../../../components/NavFoot/NavFootDoc'

import {patientNav, patientRoute} from '../../../router/patient'
import {doctorNav, doctorRoute} from "../../../router/doctor";

import {getUser} from "../../../redux/user/action";
import {getPatientList, getLabelList} from "../../../redux/doctor/action";

import {open_chat} from "../../../redux/chat/action";

import Cookies from 'js-cookie';

class Main extends Component {
	state = {
		type: '',
	};

	componentDidMount() {
		const token = Cookies.get('token');

		if (sessionStorage.identity === 'doctor') {
			this.props.getPatientList(token);
			this.props.getLabelList(token);
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const {username, password} = nextProps.user;
		if (sessionStorage.already_get_user) {
			open_chat(username, password)
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


		/* 身份验证 思路
		* 1. 第一次登录
		* 	1）sessionStorage 为空
		* 	2）进行验证
		* 2.数据加载成功后
		* 	1）sessionStorage 根据 用户身份 决定是否进行拦截
		 */

		if (!sessionStorage.already_get_user) {
			if (!phone || !identity) {
				return <Redirect to={'/login'}/>
			}
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

