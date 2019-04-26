import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Statistics.less'

import Echarts from '../../../components/Echart/Echart'
import {Icon, NavBar, WhiteSpace, List,} from "antd-mobile";

const Item = List.Item;

class Statistics extends Component {
	render() {
		return (
			<div className='countBox'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>
					统计
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<Echarts/>

				<List>
					<Item
						onClick={() => this.props.history.push('/invite-doctor-list')}
						arrow={'horizontal'}
					>
						查看邀请同行详情
					</Item>

					<WhiteSpace/>

					<Item
						onClick={() => this.props.history.push('/invite-patient-list')}
						arrow={'horizontal'}
					>
						查看邀请病人详情
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
)(Statistics);
