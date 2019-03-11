import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, Result, WhiteSpace, List} from "antd-mobile";

import './DoctorDetail.less'

const Item = List.Item;

class DoctorDetail extends Component {
	render() {
		const {avatar, name, phone, sex, birth, affiliated_hospital, department, with_title, vocational_certificate,introduction} = this.props.user;

		return (
			<div className={'doctor-detail'}>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				> 个人资料
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<div onClick={() => this.props.history.push('/doctor-detail')}>
					<Result
						img={<img className={'avator'} src={avatar} alt=""/>}
						title={<p className={'name'}>{name} <img className={'sex'} src={require('./img/male@3x.png')} alt=""/></p>}
					/>
				</div>

				<WhiteSpace/>
				<List>
					<Item
						extra={'李医生'}
					>
						姓名
					</Item>
					<Item
						extra={phone}
					>
						手机号
					</Item>
				</List>

				<WhiteSpace/>
				<List>
					<Item
						extra={sex === 1 ? '男' : '女'}
					>
						性别
					</Item>
					<Item
						extra={birth}
					>
						生日
					</Item>
				</List>

				<WhiteSpace/>
				<List>
					<Item
						extra={affiliated_hospital}
					>
						医院
					</Item>
					<Item
						extra={department}
					>
						科室
					</Item>
					<Item
						extra={with_title}
					>
						职称
					</Item>
				</List>

				<WhiteSpace/>

				<Item>
					医生职业证书
					<Item.Brief>
						<img className={'certificate'} src={vocational_certificate} alt=""/>
					</Item.Brief>
				</Item>

				<WhiteSpace/>
				<Item multipleLine={true} wrap={true}>
					<div className={'brief'}>
						{introduction}
					</div>
				</Item>
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
)(DoctorDetail);
