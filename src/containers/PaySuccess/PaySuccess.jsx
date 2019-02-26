import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, Result, WhiteSpace} from "antd-mobile";

import './PaySuccess.less'

class PaySuccess extends Component {
	render() {
		return (
			<div className={'pay-success'}>
				<NavBar
					mode="light"
				>
					支付成功
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<Result
					img={<img className={'header-img'} src={require('./img/支付成功@3x.png')} alt=""/>}
					title="订单支付成功"
					message={<div>￥{this.props.match.params.money}</div>}
				/>

				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<div className={'button'}>支付成功</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(PaySuccess);
