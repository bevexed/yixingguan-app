import React, {Component} from 'react';
import {connect} from 'react-redux';

import './PatientIndex.less'

import {reqBanner} from "../../api";

import {
	Carousel,
	SearchBar,
	Menu,
	ActivityIndicator,
	Button,
	Flex,
	Icon,
} from "antd-mobile";
import DocList from '../../components/DocList/DocList'

const data = [
	{
		value: '1',
		label: 'Food',
	}, {
		value: '2',
		label: 'Supermarket',
	},
	{
		value: '3',
		label: 'Extra',
		isLeaf: true,
	},
];


class PatientIndex extends Component {
	state = {
		bannerData: ['123', '123', '123'],
		imgHeight: 170,

		searchWord: '',

		initData: '',
		show: false,
	};

	componentWillMount() {
		reqBanner()
	}

	// SearchInput 输入
	handleChange = (name, val) => {
		console.log(val);
		this.setState({
			[name]: val
		})
	};


	// 单选框修改
	onChange = (value) => {
		let label = '';
		data.forEach((dataItem) => {
			if (dataItem.value === value[0]) {
				label = dataItem.label;
				if (dataItem.children && value[1]) {
					dataItem.children.forEach((cItem) => {
						if (cItem.value === value[1]) {
							label += ` ${cItem.label}`;
						}
					});
				}
			}
		});
		console.log(label);
	};

	handleClick = (e) => {
		e.preventDefault(); // Fix event propagation on Android
		this.setState({
			show: !this.state.show,
		});
		// mock for async data loading
		if (!this.state.initData) {
			setTimeout(() => {
				this.setState({
					initData: data,
				});
			}, 500);
		}
	};

	onMaskClick = () => {
		this.setState({
			show: false,
		});
	};

	componentDidMount() {
		// simulate img loading
		setTimeout(() => {
			this.setState({
				bannerData: ['123', '123', '123'],
			});
		}, 100);
	}

	render() {
		const {initData, show} = this.state;
		const menuEl = (
			<Menu
				className="single-foo-menu"
				data={initData}
				value={['1']}
				level={1}
				onChange={this.onChange}
				height={document.documentElement.clientHeight * 0.6}
			/>
		);
		const loadingEl = (
			<div style={{position: 'absolute', width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center'}}>
				<ActivityIndicator size="large"/>
			</div>
		);


		return (
			<div>
				<Carousel
					autoplay={true}
					infinite
					beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
					afterChange={index => console.log('slide to', index)}
					style={{minHeight:'170Px'}}
				>
					{this.state.bannerData.map(val => (
						<a
							key={val}
							href="/"
							style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
						>
							<img
								src={require(`./img/${val}.png`)}
								alt=""
								style={{width: '100%', verticalAlign: 'top'}}
								onLoad={() => {
									// fire window resize event to change height
									window.dispatchEvent(new Event('resize'));
									this.setState({imgHeight: 'auto'});
								}}
							/>
						</a>
					))}
				</Carousel>

				<SearchBar
					placeholder="搜疾病、医生、医科"
					maxLength={30}
					onChange={val => this.handleChange('searchWord', val)}
				/>

				<div className={'double-select'}>
					<Flex>
						<Flex.Item justify={'center'} align={'center'}>
							<Button
								onClick={this.handleClick}
							>所有城市 <Icon type={'down'}/></Button>
						</Flex.Item>
						<Flex.Item>
							<Button
								onClick={this.handleClick}
							>所有城市 <Icon type={'down'}/> </Button>
						</Flex.Item>
					</Flex>
					{show ? initData ? menuEl : loadingEl : null}
					{show ? <div className="menu-mask" onClick={this.onMaskClick}/> : null}
				</div>


				<DocList/>
				<DocList/>
				<DocList/>
				<DocList/>
				<DocList/>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(PatientIndex);

