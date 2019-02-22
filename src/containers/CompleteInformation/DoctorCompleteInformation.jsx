import React, {Component} from 'react';
import {connect} from 'react-redux';

import './DoctorCompleteInformation.less'

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
		sex: [1],
		data:'1965-01-01',
		files:[]
	};

	handelChange = (name, val) => {
		this.setState({
			[name]: val
		})
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
					extra={this.state.date}
					value={this.state.date}
					onChange={date => this.setState({date})}
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
)(DoctorCompleteInformation);
