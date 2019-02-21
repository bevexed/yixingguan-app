import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.less'
import {WhiteSpace} from "antd-mobile";

class Register extends Component {
	render() {
		return (
			<div className={'register'}>
				<span className={'title'}>
					为一千二百万患者提供问诊服务
				</span>
				<img className={'background'} src={require('../../asset/img/78-01@3x.png')} alt=""/>
				<div
					className={'button'}>登录/注册</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Register);
