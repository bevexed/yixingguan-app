import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, ImagePicker, NavBar, WhiteSpace} from "antd-mobile";

import {receiveUser} from "../../redux/user/actions";

class Avatar extends Component {
	state = {
		avatar: []
	};

	selectAvatar = avatar => {
		this.setState({
			avatar
		});

		if (avatar.length) {
			console.log(avatar[0].file);
			this.props.receiveUser({avatar: avatar[0].url,selectAvatar:avatar[0].url})
		}
	};

	render() {
		const {avatar} = this.state;

		return (
			<div>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>选择头像</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<ImagePicker
					length={1}
					files={avatar}
					onChange={avatar => this.selectAvatar(avatar)}
					selectable={avatar.length < 1}
				/>

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
		receiveUser
	}
)(Avatar);
