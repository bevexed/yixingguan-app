import React, {Component} from 'react';
import {
	Icon,
	NavBar,
	List,
	WhiteSpace,
	Stepper,
	Radio,
	Toast
} from "antd-mobile";

import './Tips.less'

import {getWxConfig, wxPay} from "../../../wx-jssdk";
import {reqGetPayAmounts} from "../../../api/patient";

const RadioItem = Radio.RadioItem;

const Item = List.Item;


const pays = [
	{
		label: '微信',
		value: 0,
		img: '微信.svg'
	},
	// {
	// 	label: '支付宝',
	// 	value: 1,
	// 	img: '支付宝.svg'
	// }
];


class Tips extends Component {

	state = {
		payType: 0,
		moneyIndex: -1,
		money: 0,
		disabled: false,
		moneyList: []
	};

	componentDidMount() {
		setTimeout(getWxConfig, 200);
		this.getPayAmount();
	}

	getPayAmount = () => {
		reqGetPayAmounts().then(
			res => {
				if (res.code === 1) {
					this.setState({moneyList: res.data})
				}
			}
		)
	};

	Pay = () => {
		const money = parseFloat(this.state.money);
		console.log(money);
		const chat_room = this.props.match.params.chat_room;
		if (money <= 0) {
			Toast.fail('请输入金额', 1);
			return
		}
		wxPay({chat_room, money, history: this.props.history})
	};

	onHandleChange = (name, val) => {
		this.setState({
			[name]: val
		});
	};

	onSelectMoney = (name, val, money) => {
		this.setState({
			[name]: val,
			money,
			disabled: true
		});
	};

	render() {
		const {moneyList} = this.state;
		return (
			<div className={'tips'}>
				<NavBar
					mode="light"
					icon={<Icon type="left" color={'#000'} size={'md'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>
					打赏他
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List
					renderHeader={() => '打赏金额'}
					// renderFooter={() => '您与李薇薇医生共聊了18分钟'}
				>
					<Item
						activeStyle={{}}
						onClick={() => this.setState({disabled: false, moneyIndex: -1})}
						extra={
							<Stepper
								style={{width: '100%', minWidth: '100px'}}
								min={0}
								showNumber
								size="small"
								step={1}
								defaultValue={this.state.money}
								disabled={this.state.disabled}
								onChange={val => this.setState({money: val})}
							/>}
					>
						打赏金额
					</Item>


					<div className='select-money'>
						{
							moneyList.map(item =>
								<span
									className={this.state.moneyIndex === item.id ? 'active' : null}
									onClick={() => this.onSelectMoney('moneyIndex', item.id, item.title)}
									key={item.id}>{item.title}</span>
							)
						}
					</div>
				</List>

				<WhiteSpace/>

				<List renderHeader={() => '支付方式'}>
					{pays.map((pay, index) => (
						<RadioItem key={index} checked={this.state.payType === pay.value} onChange={() => this.onHandleChange('payType', pay.value)}>
							<img className={'img'} src={require('./img/' + pay.img)} alt=""/>{pay.label}
						</RadioItem>
					))}
				</List>

				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<div
					className={'button'}
					onClick={this.Pay}
				>确认支付
				</div>
			</div>
		);
	}
}

export default Tips
