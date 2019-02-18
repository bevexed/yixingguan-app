import React, {Component} from 'react';
import {connect} from 'react-redux';

class PatientIndex extends Component {
	render() {
		return (
			<div>
				PatientIndex
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(PatientIndex);

