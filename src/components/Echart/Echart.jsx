import React, {Component} from 'react';
import {connect} from "react-redux";

import ReactEcharts from 'echarts-for-react';

class Echart extends Component {

	getOption = () => {
		 return {
			legend: {
			},
			tooltip: {
				trigger: 'axis',
				showContent: true
			},
			dataset: {
				source: [
					['天', '02/02', '02/03', '02/04', '02/05', '02/06', '02/07'],
					['收益金额', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
					['病人数量', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
					['邀请人数', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
				]
			},
			xAxis: {
				type: 'category',
				name: '时间'
			},
			yAxis: {
				gridIndex: 0,
			},
			grid: {
				width: '77%',
				top: '20%'
			},
			series: [
				{type: 'line', smooth: true, seriesLayoutBy: 'row'},
				{type: 'line', smooth: true, seriesLayoutBy: 'row'},
				{type: 'line', smooth: true, seriesLayoutBy: 'row'},
			],
		};

	};

	render() {
		return (
			<div className={'statistics'}>
				<ReactEcharts
					option={this.getOption()}
					// notMerge={true}
					lazyUpdate={true}
					// theme={"theme_name"}
					// onChartReady={this.onChartReadyCallback}
					// onEvents={EventsDict}
					// opts={}
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
)(Echart);
