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
	resetDoctorList
} from "../../../redux/patient/action";

import {reqGetQrCode} from "../../../api/patient";

import {reqGetCity, reqGetDepartments} from "../../../api";
import {reqBanner} from "../../../api/patient";
import LoadingMore from "../../../components/LoadIngMore/LoadingMore";
import Qrcode from "qrcode.react";

const Item = List.Item;

class PatientIndex extends Component {
	state = {
		bannerData: [],
		imgHeight: 170,
		// 搜索
		searchWord: '',

		// 所有城市 全部科室下拉列表显示隐藏
		show: false,

		// 联系客服二维码显示隐藏
		code_show: false,

		// 下拉列表数据
		cityList: '',
		departmentList: '',
		which: '',

		// 医生列表分页数据
		page: 1,
		total: 100,
		department: '',
		locating_city: '',

		code: ''
	};


	componentDidMount() {
		this.getDoctor(0);

		reqGetQrCode().then(
			res => {
				if (res.code === 1) {
					this.setState({code: res.data})
				}
			}
		);

		reqBanner().then(
			res => {
				if (res.code === 1) {
					this.setState({bannerData: res.data})
				}
			}
		)
	}

	getDoctor = (page) => {
		const {city, locating_city, department} = this.state;
		const params = {
			locating_city: locating_city || '上海',
			page: page + 1,
			city: city || null,
			department: department || null
		};
		this.props.getDoctorList(params);
	};

	// SearchInput 输入
	handleChange = (name, val) => {
		this.setState({
			[name]: val
		})
	};

	seek = (title, history) => {
		this.props.getSeekDoctorList(title, history)
	};


	// 按选项检索医生
	onChange = (value) => {
		let {which, show, departmentList, department, cityList, locating_city} = this.state;
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

		department = which === departmentList ? label : department;
		locating_city = which === cityList ? label : locating_city;
		this.props.resetDoctorList({locating_city, page: 1, city: locating_city, department});

		this.setState({
			show: !show,
			// page: 1,
			// total: 100,
			department: which === departmentList ? label : department,
			locating_city: which === cityList ? label : locating_city
		});
	};

	// 获取城市列表
	getCity = (e) => {
		const {cityList, show} = this.state;
		e.preventDefault(); // Fix event propagation on Android
		this.setState({
			show: !show,
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
							this.setState({cityList, which: cityList})
						}
					}
				);
		}
	};

	// 获取科室列表
	getDepartment = (e) => {
		const {departmentList, show} = this.state;
		e.preventDefault(); // Fix event propagation on Android
		this.setState({
			show: !show,
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
							this.setState({departmentList, which: departmentList})
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
		const {show, code_show, which, code} = this.state;
		const {list: doctorList, total, current_page: page} = this.props.doctorList;


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
					style={{minHeight: '170Px', maxHeight: '500PX'}}
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
					{show ? <div className="menu-mask" onClick={this.onMaskClick}/> : <DocList doctorList={doctorList}/>}
				</div>

				<LoadingMore page={page} total={total} callback={() => this.getDoctor(page, total)}/>


				<div
					className='side-bar'
					onClick={() => this.setState({code_show: true})}
				>
					联系客服
				</div>

				{code_show &&
				<div
					className='qrcode-react'
					onClick={() => this.setState({code_show: false})}
				>
					<div className='qrcode-padding'>
						<p className='share-content'>扫描即可联系客服！</p>
						<p className='content'>点击右上角按钮即可分享</p>
						<p className='content'>扫描或长按关注</p>
						<img className='share-img' src={code} alt=""/>
					</div>
				</div>
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
		getSeekDoctorList,
		resetDoctorList
	}
)(PatientIndex);

