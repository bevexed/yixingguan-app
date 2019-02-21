import React, {Component} from 'react';
import {connect} from 'react-redux';

class PersonalDoc extends Component {
	render() {
		return (
			<div>
				123
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(PersonalDoc);
