import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PersonalPatient.less'

import {Badge, Card, List, WhiteSpace} from "antd-mobile";

const Header = Card.Header;
const Item = List.Item;


class PersonalPatient extends Component {

	horizontal = () => {
		return 'horizontal'
	};

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

				<div className={'gray'}>
					<List>
						<Item
							extra={'王小丫'}
						>姓名</Item>
						<Item
							extra={'暂无'}
							arrow={this.horizontal()}
						>单位</Item>
						<Item
							extra={'12312321321'}
							arrow={this.horizontal()}
						>手机号</Item>
					</List>
					<WhiteSpace size={'lg'}/>

					<List>
						<Item
							extra={<Badge dot/>}
							arrow={this.horizontal()}
						>预约受理记录</Item>
					</List>

					<WhiteSpace size={'lg'}/>

					<List>
						<Item
							arrow={this.horizontal()}
						>邀请好友</Item>
						<Item
							arrow={this.horizontal()}
						>设置</Item>
					</List>


				</div>

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
