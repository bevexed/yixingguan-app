import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.less'

import {Redirect} from "react-router-dom";

import {
	receiveUser
} from "../../redux/user/actions";

import {List, InputItem, WhiteSpace} from "antd-mobile";

class MyComponent extends Component {
	state = {
		phone: ''
	};

	handleChange = (name, val) => {
		this.setState({
			[name]: val
		});
	};

	getPhone = () => {
		this.props.receiveUser({
			phone: this.state.phone,
			code: 123,
		});
	};

	render() {
		const {phone} = this.props.user;

		if (phone) {
			return <Redirect to={'/select-player'}/>
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
						onChange={val => this.handleChange('phone', val)}
					>手机号码</InputItem>
					<WhiteSpace/>
					<InputItem
						maxLength={6}
						placeholder=""
						type="number"
						extra={<span className={'code'}>获取</span>}
						onExtraClick={() => alert(1)}
					>验证码</InputItem>

				</List>
				<div
					className='button'
					onClick={this.getPhone}
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
	{receiveUser}
)(MyComponent);
