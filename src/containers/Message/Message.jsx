import React, {Component} from 'react';
import {connect} from 'react-redux';

class Message extends Component {
	render() {
		return (
			<div>
Message
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
