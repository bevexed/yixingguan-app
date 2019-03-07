import React, {Component} from 'react';
import {connect} from 'react-redux';

import './PatientIndex.less'

import {
	Carousel,
	SearchBar,
	Menu,
	ActivityIndicator,
	Button,
	Icon,
	List
} from "antd-mobile";
import DocList from '../../components/DocList/DocList'

import {
	getDoctorList,
	getSeekDoctorList
} from "../../redux/patient/actions";
import {reqBanner} from "../../api/patient";

const Item = List.Item;

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
		bannerData: [],
		imgHeight: 170,

		searchWord: '',

		initData: '',
		show: false,

		code_show: false,
	};


	componentDidMount() {
		const params = {
			locating_city: '成都',
			page: '' || 1,
			city: '' || null,
			department: '' || null
		};
		this.props.getDoctorList(params);

		reqBanner().then(
			res => {
				if (res.code === 1) {
					this.setState({bannerData: res.data})
				}
			}
		)
	}

	// SearchInput 输入
	handleChange = (name, val) => {
		console.log(val);
		this.setState({
			[name]: val
		})
	};

	seek = title => {
		console.log(title);
		this.props.getSeekDoctorList(title)
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

	render() {
		const {initData, show, code_show} = this.state;
		const DoctorListData = this.props.doctorList.list;


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
			<div className={'patient-index'}>
				<Carousel
					autoplay={true}
					infinite
					beforeChange={(from, to) => to}
					afterChange={index => index}
					style={{minHeight: '170Px'}}
				>
					{this.state.bannerData.map(val => (
						<a
							key={val.id}
							href={val.url}
							style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
						>
							<img
								src={val.picture}
								alt={val.name}
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

				<Item>
					<SearchBar
						placeholder="搜疾病、医生、医科"
						maxLength={30}
						onChange={val => this.handleChange('searchWord', val)}
						cancelText={'搜索'}
						onCancel={val => this.seek(val)}
					/>
				</Item>

				<div className={'double-select'}>
					<List>
						<div className={'button'}>
							<Button
								onClick={this.handleClick}
							>所有城市 <Icon type={'down'}/></Button>
							<Button
								onClick={this.handleClick}
							>全部科室 <Icon type={'down'}/> </Button>
						</div>
					</List>
					{show ? initData ? menuEl : loadingEl : null}
					{show ? <div className="menu-mask" onClick={this.onMaskClick}/> : null}
				</div>


				<DocList doctorList={DoctorListData}/>


				<div
					className='side-bar'
					onClick={() => this.setState({code_show: true})}
				>
					联系客服
				</div>

				{code_show ?
					<div
						className='code'
						onClick={() => this.setState({code_show: false})}
					>
						<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=977147320,1756285936&fm=26&gp=0.jpg" alt=""/>
					</div> : null
				}

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		doctorList: state.doctorList
	};
}

export default connect(
	mapStateToProps,
	{
		getDoctorList,
		getSeekDoctorList
	}
)(PatientIndex);

