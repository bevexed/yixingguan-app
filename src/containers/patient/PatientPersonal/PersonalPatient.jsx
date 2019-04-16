import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PersonalPatient.less'

import {
	// Badge,
	Card,
	List,
	WhiteSpace
} from "antd-mobile";


const Header = Card.Header;
const Item = List.Item;


class PersonalPatient extends Component {
	state = {
		code_show: false,
	};

	render() {
		const {user} = this.props;
		const {code_show} = this.state;

		return (
			<div className={'personal-patient'}>
				<Card full>
					<WhiteSpace size={'lg'}/>
					<Header
						thumb={<img className='avator' src={user.avatar} alt=""/>}
						title={user.name}/>
				</Card>
				<WhiteSpace size={'lg'}/>

				<List>
					<Item
						extra={user.name}
					>姓名</Item>
					<Item
						extra={user.phone}
					>手机号</Item>
				</List>
				<WhiteSpace size={'lg'}/>

				<List
					onClick={() => this.props.history.push('/record-list')}
				>
					<Item
						// extra={<Badge dot/>}
						arrow={'horizontal'}
					>预约受理记录</Item>
				</List>

				<WhiteSpace size={'lg'}/>

				<List
					onClick={() => {
						localStorage.shareUrl = window.location.origin;
						localStorage.shareContent = '扫码即可邀请好友哦！';
						this.props.history.push('/qrcode')
					}}
				>
					<Item
						// extra={<Badge dot/>}
						arrow={'horizontal'}
					>邀请朋友</Item>
				</List>
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
)(PersonalPatient);
