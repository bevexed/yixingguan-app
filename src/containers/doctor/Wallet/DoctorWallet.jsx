import React, {Component} from 'react';

import './DoctorWallet.less'

import {
	NavBar,
	Icon,
	Result,
	WhiteSpace,
	List,
	Accordion, Toast
} from "antd-mobile";

import {reqExceptionalAccount, reqExceptionalLogs} from "../../../api/doctor";

import {reqApplyFor} from "../../../api/doctor";

const Item = List.Item;
const Panel = Accordion.Panel;

class DoctorWallet extends Component {

	state = {
		available: 0,
		page: 1,
		logs: {
			"current_page": '',
			"total": '',
			"per_page": '',
			"data": [
				{
					"time": "",
					"total": "",
					"info": [
						{
							"name": "",
							"amount": ""
						},
					]
				}
			]
		}
	};

	componentDidMount() {
		reqExceptionalAccount()
			.then(
				res => {
					if (res.code === 1) {
						this.setState({available: res.data.available})
					}
				}
			);

		this.getExceptionalLogs()
	}

	applyFor = async () => {
		const money = parseFloat(this.state.available);
		if (money <= 0) {
			Toast.fail('暂无可提现金额', 1);
			return
		}
		let res = await reqApplyFor(money);
		console.log(res);
		if (res.code === 1) {
			this.setState({available: 0});
			Toast.success(res.message, 1)
		} else {
			Toast.fail(res.message)
		}
	};

	getExceptionalLogs = () => {
		const {page} = this.state;
		reqExceptionalLogs(page).then(
			res => {
				if (res.code === 1) {
					this.setState({logs: res.data})
				}
			}
		)
	};

	render() {
		const {available, logs} = this.state;

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
						title={<span className={'big'}>{available}</span>}
						message={<div className={'small'}>账户余额</div>}
						buttonText={<span>提现到微信支付</span>}
						onButtonClick={this.applyFor}
					/>
				</div>

				<List renderHeader={() => '收益明细'}/>

				<Accordion accordion>
					{
						logs.data.map((log, index) =>
							<Panel
								key={index}
								header={
									<Item
										extra={<span className={'total'}>总计：¥{log.total}</span>}
									>
										{log.time}
									</Item>}>

								<List>
									{log.info.map((item, itemKey) =>
										<Item
											key={itemKey}
											extra={<span className={'income'}>¥{item.amount}</span>}
										>
											{item.name}
										</Item>)
									}
								</List>
							</Panel>)
					}
				</Accordion>
			</div>
		);
	}
}

export default DoctorWallet

