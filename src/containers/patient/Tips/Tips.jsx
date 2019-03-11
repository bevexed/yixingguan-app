import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	Icon,
	NavBar,
	List,
	WhiteSpace,
	Stepper,
	Radio,
} from "antd-mobile";

import './Tips.less'

const RadioItem = Radio.RadioItem;

const Item = List.Item;

const money = [5, 7, 10, 20, 5, 7, 10, 20];

const pays = [
	{
		label: '微信',
		value: 0,
		img: '微信.svg'
	},
	{
		label: '支付宝',
		value: 1,
		img: '支付宝.svg'
	}
];


class Tips extends Component {

	state = {
		payType: 0,
		moneyIndex: -1,
		money: 0,
		disabled: false
	};


	onHandleChange = (name, val) => {
		this.setState({
			[name]: val
		});
	};

	onSelectMoney = (name, val) => {
		this.setState({
			[name]: val,
			money: money[val],
			disabled: true
		});
	};

	render() {
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
					renderFooter={() => '您与李薇薇医生共聊了18分钟'}
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


					<div className={'select-money'}>
						{
							money.map((item, index) =>
								<span
									className={this.state.moneyIndex === index ? 'active' : null}
									onClick={() => this.onSelectMoney('moneyIndex', index)}
									key={index}>{item}元</span>
							)
						}
					</div>
				</List>

				<WhiteSpace/>

				<List renderHeader={() => 'RadioItem demo'}>
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
					onClick={()=>this.props.history.replace('/pay-success/'+this.state.money)}
				>确认支付</div>
			</div>
		);
	}
}

export default Tips
