/*
*  请求用户数据
* */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import Login from '../Login/Login'

import {getUser} from "../../../redux/user/action";
import {open_chat} from "../../../redux/chat/action";

import RegisterIndex from "../Register/RegisterIndex";

import {GetQueryString} from "../../../utils";
import {reqCode, reqToken} from "../../../api";
import Loading from "../../../components/Loading/Loading";
import DOC from '../../../containers/common/DOC/DOC'


class Intercept extends Component {
	state = {
		token: '',
	};

	componentDidMount() {
		// 微信授权后，通过 state 获取 only_no 和 assistant
		let code = GetQueryString('code');
		let state = GetQueryString('state');

		// 第一次进入时，从地址中截取 only_no 和 assistant 参数
		let only_no = GetQueryString('only_no');
		let assistant = GetQueryString('assistant');

		// 第一次进入肯定没有 token
		if (!sessionStorage.token) {
			// 微信授权邀请 code 入口 将 only_no 和 assistant 通过 state 传递
			// 这次 只是 去 获取 code 所以 内存中依旧 无 token
			if (!code) {
				reqCode(only_no + ',' + assistant);
				return
			}

			console.log('code', code);
			// 第二次 进入时 获取token 并且 接收 授权
			reqToken(code, ...state.split(',')).then(
				res => {
					console.log('reqToken', res);
					if (res.code === 1) {
						sessionStorage.token = res.data;
						const token = sessionStorage.token;
						this.setState({token});
						this.props.getUser(token, this.props.open_chat);
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
				this.props.getUser(token, this.props.open_chat);
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
					<Route exact path='/DOC/:doc_name' component={DOC}/>
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
		open_chat
	}
)(Intercept);
