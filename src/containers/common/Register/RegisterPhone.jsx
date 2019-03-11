import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.less'

import Author from './Author'

import {Redirect} from "react-router-dom";

import {
	updataPhone,
} from "../../../redux/user/action";

import {List, InputItem, WhiteSpace, Toast} from "antd-mobile";

class RegisterPhone extends Component {

	state = {
		phone: '',
		hasError: false,
		auto_code: '',
		isAuthor: true
	};

	onErrorClick = () => {
		if (this.state.hasError) {
			Toast.info('手机号码格式不对');
		}
	};

	handleChange = (name, val) => {
		if (name === 'phone') {
			if (val.replace(/\s/g, '').length < 11) {
				this.setState({
					hasError: true,
				});
			} else {
				this.setState({
					hasError: false,
				});
			}
		}
		this.setState({
			[name]: val
		});
	};

	checkCode = () => {
		const {phone, auto_code} = this.state;
		this.props.updataPhone(phone, auto_code)
	};

	render() {
		const {phone} = this.props.user;
		const {isAuthor} = this.state;

		if (phone) {
			return <Redirect to={'/select-player'}/>
		}

		if (isAuthor) {
			return <Author Author={()=>this.setState({isAuthor:false})}/>
		}

		return (
			<div className={'register-phone'}>
				<WhiteSpace size={'lg'}/>
				<WhiteSpace size={'lg'}/>
				<WhiteSpace size={'lg'}/>
				<List>
					<InputItem
						clear
						type="phone"
						placeholder=""
						onErrorClick={this.onErrorClick}
						error={this.state.hasError}
						onChange={val => this.handleChange('phone', val)}
					>手机号码</InputItem>
					<WhiteSpace/>
					<InputItem
						maxLength={6}
						placeholder=""
						type="number"
						onChange={val => this.handleChange('auto_code', val)}
						extra={<span className={'code'}>获取</span>}
						onExtraClick={() => alert('获取验证码')}
					>验证码</InputItem>

				</List>
				<div
					className='button'
					onClick={this.checkCode}
				>注册/登录
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
	{
		updataPhone,
	}
)(RegisterPhone);
