import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
	Result,
	WhiteSpace,
	Grid,
	Toast
} from "antd-mobile";

import Qrcode from 'qrcode.react';

import './PersonalDoctor.less'

const grid = [
	{
		icon: 1,
		name: '统计',
		onClick: (el) => el.props.history.push(`/statistics`)

	},
	{
		icon: 2,
		name: '我的助手',
		onClick: (el) => el.props.history.push(`/my-help`)

	},
	{
		icon: 3,
		name: '钱包',
		onClick: (el) => el.props.history.push(`/doctor-wallet`)
	},
	{
		icon: 4,
		name: '工作室',
		onClick: (el) => el.props.history.push('./doctor-detail')
	},
	{
		icon: 5,
		name: '发布图文',
		onClick: (el) => el.props.history.push('/published')
	},
	{
		icon: 6,
		name: '邀请同行',
		onClick: (el, is_audit, only_no) =>
			el.setState({
				code_show: true, title: '邀请同行',
				uri: 'http://' + window.location.host + '?only_no=' + only_no + '&assistant=' + 1
			})
	},
	{
		icon: 12,
		name: '邀请助手',
		onClick: (el, is_audit, only_no) =>
			el.setState({
				code_show: true, title: '邀请助手',
				uri: 'http://' + window.location.host + '?only_no=' + only_no + '&assistant=' + 2
			})
	},
	{
		icon: 14,
		name: '邀请病人',
		onClick: (el, is_audit, only_no) =>
			el.setState({
				code_show: true, title: '邀请病人',
				uri: 'http://' + window.location.host + '/doctor-chat-list?only_no=' + only_no + '&assistant=' + 3
			})
	}
];

const grid2 = [
	{
		icon: 7,
		name: '统计',
	},
	{
		icon: 8,
		name: '我的助手'
	},
	{
		icon: 9,
		name: '钱包'
	},
	{
		icon: 4,
		name: '申请工作室',
		onClick: (el, is) => {
			if (is === 1) {
				Toast.fail('正在审核中', 1);
				return
			}
			el.props.history.push(`/doctor-complete-information`)
		}
	},
	{
		icon: 10,
		name: '发布图文'
	},
	{
		icon: 11,
		name: '邀请同行'
	},
	{
		icon: 13,
		name: '邀请助手'
	},
	{
		icon: 15,
		name: '邀请病人'
	},

];

class MyComponent extends Component {
	state = {
		code_show: false,
		uri: '',
		title: ''
	};

	render() {
		const {code_show, uri, title} = this.state;
		const {is_audit, name, avatar, only_no} = this.props.user;

		return (
			<div className='personal-doctor'>
				<div onClick={() => this.props.history.push('/doctor-detail')}>
					<Result
						img={<img className='avator' src={avatar} alt=""/>}
						title={<p className={'name'}>{name} <img className={'sex'} src={require('./img/male@3x.png')} alt=""/></p>}
					/>
				</div>

				<WhiteSpace/>
				<Grid data={is_audit === 2 ? grid : grid2}
							columnNum={3}
							onClick={dataItem => dataItem.onClick ? dataItem.onClick(this, is_audit, only_no) : () => null}
							renderItem={dataItem => (
								<div className={'item'}>
									<img className={'icon'} src={require('./img/' + dataItem.icon + '.png')} alt=""/>
									<div style={{color: is_audit === 2 ? '#000' : '#888', fontSize: '14px', marginTop: '12px'}}>
										<span>{dataItem.name}</span>
									</div>
								</div>
							)}
				/>

				{code_show ?
					<div
						className='qrcode-react'
						onClick={() => this.setState({code_show: false})}
					>
						<p>{title}</p>
						<Qrcode
							value={uri}
							renderAs='svg'
							size={200}
							bgColor='#FFFFFF'
							fgColor={'#244b3f'}
							level='H'
						/>
					</div> : null
				}
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
)(MyComponent);
