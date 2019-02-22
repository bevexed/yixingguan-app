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
		name: '统计'
	},
	{
		icon: 2,
		name:'我的助手'
	},
	{
		icon:3,
		name:'钱包'
	},
	{
		icon:4,
		name:'工作室'
	},
	{
		icon:5,
		name:'发布图文'
	},
	{
		icon:6,
		name:'邀请同行'
	}
];

class MyComponent extends Component {
	render() {
		return (
			<div className={'personal-doctor'}>
				<Result
					img={<img className={'avator'} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551407674&di=ec267c3e88e04ffe96d351b62c7a38a7&imgtype=jpg&er=1&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F170914%2F0220055L1-9.jpg" alt=""/>}
					title={<p className={'name'}>李医生 <img className={'sex'} src={require('./img/male@3x.png')} alt=""/></p>}
				/>
				<WhiteSpace/>
				<Grid data={grid}
							columnNum={3}
							renderItem={(dataItem, index) => (
								<div className={'item'}>
									<img className={'icon'} src={require('./img/' + dataItem.icon + '.png')} alt=""/>
									<div style={{color: '#888', fontSize: '14px', marginTop: '12px'}}>
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
	return {};
}

export default connect(
	mapStateToProps,
)(MyComponent);
