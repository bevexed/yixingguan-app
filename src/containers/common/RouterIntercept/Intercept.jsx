/*
*  请求用户数据
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
import Loading from "../../../components/Loading/Loading";

class Intercept extends Component {
	state = {
		token: '',
	};

	componentDidMount() {
		let state = GetQueryString('state');
		console.log(state);
		if (!sessionStorage.token) {
			// 授权邀请 code 入口
			let only_no = GetQueryString('only_no');
			let assistant = GetQueryString('assistant');
			let code = GetQueryString('code');
			if (!code) {
				reqCode(only_no, assistant);
				return false
			}
			reqToken(code, only_no, assistant).then(
				res => {
					if (res.code === 1) {
						sessionStorage.token = res.data;
						const token = sessionStorage.token;
						this.setState({token});
						this.props.getUser(token);
					} else {
						// Toast.fail(res.message, 3, () => {
						setTimeout(() => {
							sessionStorage.clear();
							window.location.assign(window.location.origin)
						}, 3000)
						// });
					}
				}
			)

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
