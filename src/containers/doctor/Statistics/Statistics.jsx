import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Statistics.less'

import Echarts from '../../../components/Echart/Echart'
import {Icon, NavBar, WhiteSpace} from "antd-mobile";

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
