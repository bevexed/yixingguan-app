import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar,Icon} from "antd-mobile";

class Message extends Component {
	render() {
		return (
			<div>
			<NavBar
				mode="light"
				icon={<Icon type="left" color={'#000'} size={'md'} />}
				onLeftClick={() => this.props.history.goBack()}
			>{this.props.match.params.to}</NavBar>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Message);
