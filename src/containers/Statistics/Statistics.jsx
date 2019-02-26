import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Statistics.less'
import '../../static/iconfont/iconfont.css'

import Echarts from '../../components/Echart/Echart'
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
				<div className='countTop'>
					<span>2019/01/01-2019/02/14</span>
					<img src={require('./img/shaixuan.png')} alt=''/>
				</div>
				<div className='showDiv'>
					<span className='iconfont icon-back'></span>
					<Echarts/>
					<span className='iconfont icon-next'></span>
				</div>

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
