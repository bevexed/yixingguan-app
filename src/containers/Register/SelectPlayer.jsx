import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.less'
import {Redirect} from "react-router-dom";

import {
	updataUserType
} from "../../redux/user/actions";

import {getRedirectTo} from "../../utils";

class SelectPlayer extends Component {


	state = {
		identity: ''
	};

	goMain = () => {
		const {phone, auto_code} = this.props.user;
		const {identity} = this.state;
		const userData = {
			phone: phone || '',
			auto_code: auto_code || '',
			identity: identity === "patient" ? 1 : 2 || '',
			open_id: localStorage.openId|| '',
		};
		this.props.updataUserType(userData);
	};


	select = (player) => {
		this.setState({
			identity: player
		});
	};

	render() {
		const {identity, phone} = this.props.user;

		if (!phone || identity) {
			return <Redirect to={getRedirectTo(identity, phone)}/>
		}

		const selected = this.state.identity;

		return (
			<div className={'selector-player'}>
				<div
					className={selected === 'doctor' ? 'player selected' : 'player'}
					onClick={() => this.select('doctor')}
				>
					<img src={require(`./img/doctor-${selected === 'doctor' ? 's' : ''}@3x.png`)} alt=""/>
					<span>我是医生</span>
				</div>
				<div
					className={selected === 'patient' ? 'player selected' : 'player'}
					onClick={() => this.select('patient')}
				>
					<img src={require(`./img/patient-${selected === 'patient' ? 's' : ''}@3x.png`)} alt=""/>
					<span>我是患者</span>
				</div>

				<div
					className={'button'}
					onClick={this.goMain}
				>进入
				</div>
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
	{
		updataUserType,
	}
)(SelectPlayer);
