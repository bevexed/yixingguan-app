import React, {Component} from 'react';
import {connect} from 'react-redux';
import './NewPatient.less'

import {
	ListView,
	NavBar,
	Icon,
	Button, WhiteSpace
} from "antd-mobile";

const data = [
	{
		img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
		time: '2019/05/27 13:40',
		des: '患者：王小亚关注了你',
	},
];

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
	const dataBlob = {};
	for (let i = 0; i < NUM_ROWS; i++) {
		const ii = (pIndex * NUM_ROWS) + i;
		dataBlob[`${ii}`] = `row - ${ii}`;
	}
	return dataBlob;
}


class NewPatient extends Component {
	constructor(props) {
		super(props);
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});

		this.state = {
			dataSource,
			isLoading: true,
		};
	}

	componentDidMount() {
		// you can scroll to the specified position
		// setTimeout(() => this.lv.scrollTo(0, 120), 800);

		// simulate initial Ajax
		setTimeout(() => {
			this.rData = genData();
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.rData),
				isLoading: false,
			});
		}, 600);
	}

	// If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
	// componentWillReceiveProps(nextProps) {
	//   if (nextProps.dataSource !== this.props.dataSource) {
	//     this.setState({
	//       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
	//     });
	//   }
	// }

	onEndReached = (event) => {
		// load new data
		// hasMore: from backend data, indicates whether it is the last page, here is false
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}
		console.log('reach end', event);
		this.setState({isLoading: true});
		setTimeout(() => {
			this.rData = {...this.rData, ...genData(++pageIndex)};
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.rData),
				isLoading: false,
			});
		}, 1000);
	};

	render() {
		const separator = (sectionID, rowID) => (
			<div
				className={'new-patient'}
				key={`${sectionID}-${rowID}`}
				style={{
					backgroundColor: '#F5F5F9',
					borderTop: '1px solid #ECECED',
				}}
			/>
		);
		let index = data.length - 1;
		const row = (rowData, sectionID, rowID) => {
			if (index < 0) {
				index = data.length - 1;
			}
			const obj = data[index--];
			return (
				<div key={rowID} style={{padding: '0 15px'}}>
					<div className={'item'}>
						<img style={{height: '40px', marginRight: '15px',borderRadius:'50%'}} src={obj.img} alt=""/>
						<div style={{width:'80%'}}>
							<div className={'title'}>{obj.des}</div>
							<div className={'time'} >{obj.time}</div>
						</div>
						<div className={'button'} >接受</div>
					</div>
				</div>
			);
		};
		return (
			<div className={'new-patient'}>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>新患者</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<ListView
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
						{this.state.isLoading ? 'Loading...' : 'Loaded'}
					</div>)}
					renderRow={row}
					renderSeparator={separator}
					className="am-list"
					pageSize={4}
					useBodyScroll
					onScroll={() => {
						console.log('scroll');
					}}
					scrollRenderAheadDistance={500}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={10}
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
)(NewPatient);
