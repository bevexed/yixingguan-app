import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PersonalPatient.less'

import {Badge, Card, List, WhiteSpace} from "antd-mobile";

const Header = Card.Header;
const Item = List.Item;


class PersonalPatient extends Component {
	render() {
		return (
			<div className={'personal-patient'}>
				<Card full>
					<WhiteSpace size={'lg'}/>
					<Header
						thumb={<img className={'avator'} src="" alt=""/>}
						title={'注册/登录'}/>
				</Card>
				<WhiteSpace size={'lg'}/>

				<List>
					<Item
						extra={'王小丫'}
					>姓名</Item>
					<Item
						extra={'暂无'}
						arrow={'horizontal'}
					>单位</Item>
					<Item
						extra={'12312321321'}
						arrow={'horizontal'}
					>手机号</Item>
				</List>
				<WhiteSpace size={'lg'}/>

				<List
					onClick={()=>this.props.history.push('/record-list')}
				>
					<Item
						extra={<Badge dot/>}
						arrow={'horizontal'}
					>预约受理记录</Item>
				</List>

				<WhiteSpace size={'lg'}/>

				<List>
					<Item
						arrow={'horizontal'}
					>邀请好友</Item>
					<Item
						arrow={'horizontal'}
					>设置</Item>
				</List>


			</div>

		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(PersonalPatient);
