import React, {Component} from 'react';
import {connect} from 'react-redux';

class Personal extends Component {
	render() {
		return (
			<div>
				Person
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Personal);
