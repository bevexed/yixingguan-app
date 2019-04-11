import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	SearchBar,
	Menu,
	ActivityIndicator,
	Button,
	Icon,
	List,
	NavBar,
	WhiteSpace,
	Toast
} from "antd-mobile";
import LoadingMore from "../../../components/LoadIngMore/LoadingMore";
import './PatientIndex.less'

import DocList from '../../../components/DocList/DocList'
import {
	getDoctorList,
	getSeekDoctorList,
	resetDoctorList
} from "../../../redux/patient/action";
import {reqGetCity, reqGetDepartments} from "../../../api";
import {reqReferrals} from "../../../api/doctor";

const Item = List.Item;

class DoctorList extends Component {
	state = {
		// 搜索
		searchWord: '',

		// 所有城市 全部科室下拉列表显示隐藏
		show: false,

		// 下拉列表数据
		cityList: '',
		departmentList: '',
		which: '',

		// 医生列表分页数据
		page: 1,
		total: 100,
		department: '',
		locating_city: '',

	};


	componentDidMount() {
		this.getDoctor(0);
	}

	doReferrals = url => {
		const only_no = this.props.match.params.only_no;
		reqReferrals({only_no, url})
			.then(res => {
				if (res.code === 1) {
					Toast.success(res.message, 1)
				} else {
					Toast.fail(res.message, 1)
				}
			})
	};

	getDoctor = (page) => {
		const {city, locating_city, department} = this.state;
		const params = {
			locating_city: locating_city || '北京',
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
			// page: 2,
			// total: 100,
			department: which === departmentList ? label : department,
			locating_city: which === cityList ? label : locating_city
		});
	};

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
							this.setState({cityList, which: cityList})
						}
					}
				);
		}
	};

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
		const {show, which} = this.state;
		const {list: doctorList, total, current_page: page} = this.props.doctorList;
		console.log(doctorList, total, page);

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
				<NavBar
					mode="light"
					icon={<Icon type="left" color={'#000'} size={'md'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>医生列表</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

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
					{show ? <div className="menu-mask" onClick={this.onMaskClick}/> : <DocList doctorList={doctorList} identity={'doctor'} doReferrals={this.doReferrals}/>}
				</div>

				<LoadingMore page={page} total={total} callback={() => this.getDoctor(page, total)}/>

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
)(DoctorList);

