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

import DocList from '../../../components/DocList/DocList'
import {
	getDoctorList,
	getSeekDoctorList,
} from "../../../redux/patient/action";

import {reqGetCity, reqGetDepartments} from "../../../api";
import {reqBanner} from "../../../api/patient";

const Item = List.Item;

class PatientIndex extends Component {
	state = {
		bannerData: [],
		imgHeight: 170,

		searchWord: '',

		initData: '',
		show: false,

		code_show: false,

		cityList: '',
		departmentList: '',
		which: '',
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
		this.setState({
			[name]: val
		})
	};

	seek = (title, history) => {
		this.props.getSeekDoctorList(title, history)
	};


	// 单选框修改
	onChange = (value) => {
		const {which} = this.state;
		let label = '';
		which.forEach((dataItem) => {
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

	getCity = (e) => {
		const {cityList} = this.state;
		e.preventDefault(); // Fix event propagation on Android
		this.setState({
			show: !this.state.show,
			which: cityList
		});
		// mock for async data loading
		if (!cityList) {
			reqGetCity()
				.then(
					res => {
						if (res.code === 1) {
							let cityList = res.data.map(item => ({value: item, label: item}));
							console.log(cityList);
							this.setState({cityList,which:cityList})
						}
					}
				);
		}
	};

	getDepartment = (e) => {
		const {departmentList} = this.state;
		e.preventDefault(); // Fix event propagation on Android
		this.setState({
			show: !this.state.show,
			which: departmentList
		});
		// mock for async data loading
		if (!departmentList) {
			reqGetDepartments()
				.then(
					res => {
						if (res.code === 1) {
							let departmentList = res.data.map(item => ({value: item, label: item}));
							console.log(departmentList);
							this.setState({departmentList,which:departmentList})
						}
					}
				);
		}
	};

	onMaskClick = () => {
		this.setState({
			show: false,
		});
	};

	render() {
		const {show, code_show, cityList, departmentList, which} = this.state;
		const DoctorListData = this.props.doctorList;


		const menuEl = (
			<Menu
				className="single-foo-menu"
				data={which}
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
						onCancel={val => this.seek(val, this.props.history)}
					/>
				</Item>

				<div className={'double-select'}>
					<List>
						<div className={'button'}>
							<Button
								onClick={this.getCity}
							>所有城市 <Icon type={'down'}/></Button>

							<Button
								onClick={this.getDepartment}
							>全部科室 <Icon type={'down'}/> </Button>
						</div>
					</List>
					{show ? which ? menuEl : loadingEl : null}
					{show ? <div className="menu-mask" onClick={this.onMaskClick}/> : <DocList doctorList={DoctorListData}/>}
				</div>


				{/*<DocList doctorList={DoctorListData}/>*/}


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

