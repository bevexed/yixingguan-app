import React, {Component} from 'react';
import {connect} from "react-redux";

import {Icon, NavBar, WhiteSpace} from "antd-mobile";

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import './Statistics.less'

class Statistics extends Component {
	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		// let myChart = echarts.init(document.getElementById('main'));
		let echartsWarp = document.getElementById('main');
		let resizeWorldMapContainer = function () {//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
			echartsWarp.style.width = window.screen.width - 50 + 'px';
			// echartsWarp.style.height = window.innerHeight+'px';
		};
		resizeWorldMapContainer();//设置容器高宽
		let myChart = echarts.init(echartsWarp);// 基于准备好的dom，初始化echarts实例

		// 绘制图表
		myChart.setOption({
			title: {
				text: '成交量',
				textStyle: {
					color: '#333',
					fontSize: 15,
					fontWeight: 'normal'
				},
				left: 20
			},
			tooltip: {},
			xAxis: {
				name: '天',
				data: ["2/2", "2/3", "2/4", "2/5", "2/6", "2/7"],
				axisTick: {
					show: false
				}
			},
			yAxis: {
				name: '量',
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				splitLine: {
					show: false
				},
			},
			series: [{
				name: '销量',
				type: 'line',
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				smooth: true
			}]
		});
	}

	render() {
		return (
			<div className={'statistics'}>
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

				<div id="main" style={{width: 400, height: 400, marginTop: 26}}>null</div>
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
