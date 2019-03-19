/*
* 同一请求 用户数据
* */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import Login from '../Login/Login'

import Cookie from "js-cookie";
import {getUser} from "../../../redux/user/action";

import RegisterIndex from "../Register/RegisterIndex";

import {GetQueryString} from "../../../utils";
import {reqCode, reqToken} from "../../../api";

import config from '../../../../package.json'
import {Toast} from "antd-mobile";

class Intercept extends Component {
	state={
		token:'',
	};

	componentDidMount() {
		const token = Cookie.get('token');
		if (!token) {
			let appId = config.wx.appID;
			let scope = config.wx.scope;
			let redirect_uri = window.location.href;
			let code = GetQueryString('code');
			if (!code) {
				reqCode(appId, redirect_uri, scope)
			} else {
				reqToken(code).then(
					res => {
						if (res.code === 1) {
							this.setState({token});
							this.props.getUser(token)
						} else {
							Toast.fail(res.message,3,()=>{
								Cookie.remove('token');
								sessionStorage.clear();
								// window.location.assign(window.location.origin)
							});
						}
					}
				)
			}
		} else {
			if (token) {
				this.props.getUser(token);
			}
		}
	}

	render() {
		const {token} = this.state;
		if (!token) {
			return null
		}
		return (
			<div>
				<Switch>
					<Route exact path='/' component={RegisterIndex}/>
					<Route exact path='/login' component={Login}/>
					<Route component={Main}/>
				</Switch>
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
	}
)(Intercept);
