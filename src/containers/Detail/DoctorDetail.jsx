import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, Result, WhiteSpace, List} from "antd-mobile";

import './DoctorDetail.less'

const Item = List.Item;

class DoctorDetail extends Component {
	render() {
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
						img={<img className={'avator'} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551407674&di=ec267c3e88e04ffe96d351b62c7a38a7&imgtype=jpg&er=1&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F170914%2F0220055L1-9.jpg" alt=""/>}
						title={<p className={'name'}>李医生 <img className={'sex'} src={require('./img/male@3x.png')} alt=""/></p>}
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
						extra={'12321312312312312'}
					>
						手机号
					</Item>
				</List>

				<WhiteSpace/>
				<List>
					<Item
						extra={'李医生'}
					>
						性别
					</Item>
					<Item
						extra={'55岁'}
					>
						生日
					</Item>
				</List>

				<WhiteSpace/>
				<List>
					<Item
						extra={'xxx医院'}
					>
						医院
					</Item>
					<Item
						extra={'外科'}
					>
						科室
					</Item>
					<Item
						extra={'副主任医师'}
					>
						职称
					</Item>
				</List>

				<WhiteSpace/>

				<Item>
					医生职业证书
					<Item.Brief>
						<img className={'certificate'} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551407674&di=ec267c3e88e04ffe96d351b62c7a38a7&imgtype=jpg&er=1&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F170914%2F0220055L1-9.jpg" alt=""/>
					</Item.Brief>
				</Item>

				<WhiteSpace/>
				<Item multipleLine={true} wrap={true}>
					<div className={'brief'}>
						我是隶属于浙江省立同德医院首席大医师爱的撒旦金黄色的来看哈斯是，fjtc.com.cn
					</div>
				</Item>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(DoctorDetail);
