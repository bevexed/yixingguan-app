import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar} from "antd-mobile";

class Doctors extends Component {
	render() {
		return (
			<div>
				<NavBar>
					我的医生
				</NavBar>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Doctors);
