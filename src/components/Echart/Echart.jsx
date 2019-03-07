import React, {Component} from 'react';
import {reqDataAnalysis} from "../../api/doctor";
import ReactEcharts from 'echarts-for-react';

class Echart extends Component {

	state = {
		option: {}
	};

	componentWillMount() {
		reqDataAnalysis({})
			.then(
				res => {
					if (res.code === 1) {
						this.setState({
							option:
								{
									legend: {},
									tooltip: {
										trigger: 'axis',
										showContent: true
									},
									dataset: {
										// source: this.source
										source: res.data
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
								}
						})
					}
				}
			)
	}


	render() {
		const {option} = this.state;

		return (
			<div className={'statistics'}>
				<ReactEcharts
					option={option}
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

export default Echart;
