/*
* 同一请求 用户数据
* */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import Login from '../Login/Login'

import {getUser} from "../../../redux/user/action";

import RegisterIndex from "../Register/RegisterIndex";

import {GetQueryString} from "../../../utils";
import {reqCode, reqToken} from "../../../api";

import {Toast} from "antd-mobile";

import Loading from "../../../components/Loading/Loading";

class Intercept extends Component {
	state = {
		token: '',
	};

	componentDidMount() {
		if (!sessionStorage.token) {
			let code = GetQueryString('code');
			if (!code) {
				reqCode()
			} else {
				reqToken(code).then(
					res => {
						if (res.code === 1) {
							sessionStorage.token = res.data;
							const token = sessionStorage.token;
							this.setState({token});
							this.props.getUser(token);
						} else {
							Toast.fail(res.message, 3, () => {
								// sessionStorage.clear();
								// window.location.assign(window.location.origin)
							});
						}
					}
				)
			}
		} else {
			if (sessionStorage.token) {
				const token = sessionStorage.token;
				this.setState({token});
				this.props.getUser(token);
			}
		}
	}

	render() {
		const {token} = this.state;
		if (!token) {
			return <Loading/>
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
