import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
	Result,
	WhiteSpace,
	Grid
} from "antd-mobile";

import './PersonalDoctor.less'

const grid = [
	{
		icon: 1,
		name: '统计',
		onClick:(el)=>{
			el.props.history.push(`/statistics`)
		}
	},
	{
		icon: 2,
		name: '我的助手'
	},
	{
		icon: 3,
		name: '钱包',
		onClick:  (el) => {
			el.props.history.push(`/doctor-wallet`)
		}
	},
	{
		icon: 4,
		name: '工作室',
		onClick:(el)=>{
			el.props.history.push('./doctor-detail')
		}
	},
	{
		icon: 5,
		name: '发布图文'
	},
	{
		icon: 6,
		name: '邀请同行'
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
		onClick: (el) => {
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
	}
];

class MyComponent extends Component {
	render() {
		const {is_audit} = this.props.user;

		return (
			<div className={'personal-doctor'}>
				<div onClick={() => this.props.history.push('/doctor-detail')}>
					<Result
						img={<img className={'avator'} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551407674&di=ec267c3e88e04ffe96d351b62c7a38a7&imgtype=jpg&er=1&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F170914%2F0220055L1-9.jpg" alt=""/>}
						title={<p className={'name'}>李医生 <img className={'sex'} src={require('./img/male@3x.png')} alt=""/></p>}
					/>
				</div>

				<WhiteSpace/>
				<Grid data={is_audit ? grid : grid2}
							columnNum={3}
							onClick={dataItem => dataItem.onClick ? dataItem.onClick(this) : () => {
							}}
							renderItem={dataItem => (
								<div className={'item'}>
									<img className={'icon'} src={require('./img/' + dataItem.icon + '.png')} alt=""/>
									<div style={{color: is_audit ? '#000' : '#888', fontSize: '14px', marginTop: '12px'}}>
										<span>{dataItem.name}</span>
									</div>
								</div>
							)}
				/>
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
