import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updataDoctorInformation} from "../../redux/doctor/actions";

import './DoctorCompleteInformation.less'

import Cookie from 'js-cookie';

import {
	Icon,
	NavBar,
	List,
	WhiteSpace,
	InputItem,
	Picker,
	DatePicker,
	ImagePicker,
	TextareaItem
} from "antd-mobile";

const Item = List.Item;

class DoctorCompleteInformation extends Component {
	sex = [
		{
			label: '男',
			value: 1
		},
		{
			label: '女',
			value: 0
		}
	];

	state = {
		name: 123,
		avatar: '',
		sex: [1],
		birth: null,
		files: []
	};

	handelChange = (name, val) => {
		this.setState({
			[name]: val
		})
	};

	updata = () => {
		const token = Cookie.get('token');
		const {avatar, birth, sex, affiliated_hospital, department, with_title} = this.state;
		const DoctorInformation = {
			token, avatar, birth, sex, affiliated_hospital, department, with_title
		}
	};

	render() {
		return (
			<div className={'doctor-complete-information'}>
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
					>
						<img className={'avator'} src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2825443055,3654672452&fm=27&gp=0.jpg" alt=""/>
					</Item>
				</List>

				<WhiteSpace/>


				<InputItem
					placeholder="请输入姓名"
					clear
					onChange={val => this.handelChange('name', val)}
				>姓名</InputItem>
				<InputItem
					placeholder="请输入手机号"
					clear
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
					value={this.state.birth}
					format={'YYYY-MM-DD'}
					onChange={date => {
						console.log(date);
						this.setState({birth: date})
					}}
				>
					<List.Item arrow="horizontal">生日</List.Item>
				</DatePicker>
				<WhiteSpace/>

				<InputItem
					placeholder="请输入医院"
					clear
					onChange={val => this.handelChange('name', val)}
				>医院</InputItem>
				<InputItem
					placeholder="请输入科室"
					clear
					onChange={val => this.handelChange('phone', val)}
				>科室</InputItem>
				<InputItem
					placeholder="请输入科室"
					clear
					onChange={val => this.handelChange('phone', val)}
				>职称</InputItem>
				<WhiteSpace/>

				<List>
					<Item>
						<div className={'doctor-certificate'}>医生职业证书</div>
						<ImagePicker
							files={this.state.files}
							onChange={this.onChange}
							onImageClick={(index, fs) => console.log(index, fs)}
							selectable={1}
						/>
					</Item>
				</List>

				<WhiteSpace/>

				<TextareaItem
					placeholder={'添加医生的自我描述'}
					autoHeight
					rows={4}
				/>

				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<div className={'button'}>保存</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
	{
		updataDoctorInformation
	}
)(DoctorCompleteInformation);
