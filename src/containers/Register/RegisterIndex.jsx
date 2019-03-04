import React, {Component} from 'react';
import './Register.less'

import {connect} from "react-redux";

import Cookie from 'js-cookie';

import {getUser} from "../../redux/user/actions";

import {Redirect} from "react-router-dom";

import {getRedirectTo} from "../../utils";

class RegisterIndex extends Component {

	componentWillMount() {
		const token = Cookie.get('token');
		if (token) {
			this.props.getUser(token)
		}
	}

	render() {

		const {identity, phone} = this.props.user;
		if (identity && phone) {
			return <Redirect to={'/'}/>
		}

		return (
			<div className={'register'}>
				<span className={'title'}>
					为一千二百万患者提供问诊服务
				</span>
				<img className={'background'} src={require('../../asset/img/78-01@3x.png')} alt=""/>
				<div
					className={'button'}
					onClick={() => this.props.history.replace('/register-phone')}
				>登录/注册
				</div>
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
	{getUser}
)(RegisterIndex);
