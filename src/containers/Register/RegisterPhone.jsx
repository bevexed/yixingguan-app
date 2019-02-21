import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.less'

import {List, InputItem, WhiteSpace} from "antd-mobile";

class MyComponent extends Component {
	render() {
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
					>手机号码</InputItem>
					<WhiteSpace/>
					<InputItem
						clear
						placeholder=""
						type="number"
						extra={<span className={'code'}>获取</span>}
						onExtraClick={()=>alert(1)}
					>验证码</InputItem>

				</List>
				<div className='button'>注册/登录</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(MyComponent);
