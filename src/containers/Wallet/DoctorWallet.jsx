import React, {Component} from 'react';
import {connect} from 'react-redux';

import './DoctorWallet.less'

import {
	NavBar,
	Icon,
	Result,
	WhiteSpace,
	List
} from "antd-mobile";

const Item = List.Item;

class DoctorWallet extends Component {
	render() {
		return (
			<div className={'doctor-wallet'}>
				<div className={'background'}>
					<NavBar
						mode="light"
						className={'nav-bar'}
						icon={<Icon type="left" color={'#fff'}/>}
						onLeftClick={() => this.props.history.goBack()}
					>
						钱包
					</NavBar>
					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>
					<Result
						title={<span className={'big'}>83224.00</span>}
						message={<div className={'small'}>账户余额</div>}
						buttonText={<span>提现到微信支付</span>}
						onButtonClick={() => alert(1)}
					/>
				</div>

				<List
					renderHeader={() => '收益明细'}
				>
					<Item
						extra={<span className={'total'}>总计：¥875.00</span>}
					>
						2019/01/04
					</Item>
					<Item
						extra={<span className={'income'}>¥875.00</span>}
					>
						王晓晓
					</Item>
					<Item
						extra={<span className={'income'}>¥875.00</span>}
					>
						王晓晓
					</Item>
					<Item
						extra={<span className={'income'}>¥875.00</span>}
					>
						王晓晓
					</Item>
					<Item
						extra={<span className={'income'}>¥875.00</span>}
					>
						王晓晓
					</Item>
				</List>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(DoctorWallet);

