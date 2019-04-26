import React, {Component} from 'react';
import {connect} from 'react-redux';

import './DoctorCompleteInformation.less'

import {reqDoctorInformation} from "../../../api/doctor";

import {
	Icon,
	NavBar,
	List,
	WhiteSpace,
	InputItem,
	Picker,
	DatePicker,
	ImagePicker,
	TextareaItem,
	Toast
} from "antd-mobile";
import {getUser} from "../../../redux/user/action";

import {rotates} from "../../../utils";


const Item = List.Item;

class DoctorCompleteInformation extends Component {
	sex = [
		{
			label: '男',
			value: 1
		},
		{
			label: '女',
			value: 2
		}
	];

	state = {
		data: null,
		name: '',
		sex: [1],
		birth: null,
		affiliated_hospital: '',
		department: '',
		with_title: '',
		files: [],
		introduction: ''
	};

	handelChange = (name, val) => {
		this.setState({
			[name]: val
		})
	};

	updata = () => {
		const avatar = [this.props.user.avatar];
		const vocational_certificate = this.state.files.length ? [this.state.files[0].url] : [];
		const {birth, sex, affiliated_hospital, department, with_title, introduction} = this.state;
		const DoctorInformation = {avatar, birth, sex: sex[0], affiliated_hospital, department, with_title, vocational_certificate, introduction};

		// if (!avatar.length) {
		// 	Toast.fail('请选择头像', 1);
		// 	return
		// }
		// if (!birth) {
		// 	Toast.fail('请选择出生年月日', 1);
		// 	return
		// }
		// if (!affiliated_hospital) {
		// 	Toast.fail('请填写所属医院', 1);
		// 	return
		// }
		// if (!department) {
		// 	Toast.fail('请填写所属科室', 1);
		// 	return
		// }
		// if (!with_title) {
		// 	Toast.fail('请填写职称', 1);
		// 	return
		// }
		// if (!vocational_certificate.length) {
		// 	Toast.fail('请上传职业证书', 1);
		// 	return
		// }
		// if (!introduction) {
		// 	Toast.fail('请填写自我描述', 1);
		// 	return
		// }


		reqDoctorInformation({...DoctorInformation}).then(
			res => {
				if (res.code === 1) {
					const token = sessionStorage.token;
					Toast.success(res.message, 3, () => {
						this.props.getUser(token);
						this.props.history.push('/doctor-personal')
					});
				} else {
					Toast.fail(res.message, 1)
				}
			}
		)


	};

	render() {
		const {avatar, selectAvatar, phone, name} = this.props.user;
		const {files} = this.state;

		return (
			<div className='doctor-complete-information'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>完善信息</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List>
					<Item
						arrow='horizontal'
						onClick={() => this.props.history.push('/avatar')}
					>
						<img className='avator' src={selectAvatar ? selectAvatar : avatar} alt="" onLoad={e => rotates(e)}/>
					</Item>
				</List>

				<WhiteSpace/>


				<InputItem
					placeholder="请输入姓名"
					value={name}
					disabled
					onChange={val => this.handelChange('name', val)}
				>姓名</InputItem>
				<InputItem
					placeholder="请输入手机号"
					value={phone}
					disabled
					onChange={val => this.handelChange('phone', val)}
				>手机号</InputItem>

				<WhiteSpace/>

				<Picker
					data={this.sex}
					value={this.state.sex}
					cols={1}
					onChange={val => this.handelChange('sex', val)}
				><Item arrow={'horizontal'}>性别</Item></Picker>

				<DatePicker
					mode="date"
					title="生日"
					minDate={new Date(1900, 1, 1, 0, 0, 0)}
					value={this.state.date}
					format={'YYYY-MM-DD'}
					onChange={date => {
						const year = date.getFullYear();
						const month = date.getMonth() + 1;
						const day = date.getDate();
						const birth = year + '-' + month + '-' + day;
						this.setState({birth, date})
					}}
				>
					<List.Item arrow="horizontal">生日</List.Item>
				</DatePicker>
				<WhiteSpace/>

				<InputItem
					placeholder="请输入医院"
					clear
					onChange={val => this.handelChange('affiliated_hospital', val)}
				>医院</InputItem>
				<InputItem
					placeholder="请输入科室"
					clear
					onChange={val => this.handelChange('department', val)}
				>科室</InputItem>
				<InputItem
					placeholder="请输入职称"
					clear
					onChange={val => this.handelChange('with_title', val)}
				>职称</InputItem>
				<WhiteSpace/>

				<List>
					<Item>
						<div className={'doctor-certificate'}>医生执业证书</div>
						<ImagePicker
							files={files}
							onChange={files => this.setState({files})}
							selectable={files.length < 1}
						/>
					</Item>
				</List>

				<WhiteSpace/>

				<TextareaItem
					placeholder={'添加医生的自我描述'}
					autoHeight
					onChange={val => this.handelChange('introduction', val)}
					rows={4}
					count={256}
				/>

				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<div
					className={'button'}
					onClick={this.updata}
				>保存
				</div>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(
	mapStateToProps,
	{
		getUser,
	}
)(DoctorCompleteInformation);
