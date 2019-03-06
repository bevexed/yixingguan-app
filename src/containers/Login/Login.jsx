import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import RegisterPhone from "../Register/RegisterPhone";
import SelectPlayer from "../Register/SelectPlayer";
import {getRedirectTo} from "../../utils";

class Login extends Component {
	render() {
		const {identity, phone} = this.props.user;

		if (!phone) {
			return <RegisterPhone/>
		}

		if (!identity) {
			return <SelectPlayer/>
		}


		return (
			<div>
				<Redirect to={getRedirectTo(identity)}/>
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
)(Login);
