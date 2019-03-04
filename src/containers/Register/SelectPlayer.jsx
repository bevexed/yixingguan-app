import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.less'
import {Redirect} from "react-router-dom";

import Cookie from 'js-cookie';

import {
	updataUserType,
	getUser,
	getWxCode
} from "../../redux/user/actions";

import {getRedirectTo} from "../../utils";

class SelectPlayer extends Component {
	componentWillMount() {
		const token = Cookie.get('token');
		if (token) {
			this.props.getUser(token);
		} else {
			getWxCode(this.props.getUser)
		}
	}

	state = {
		identity: '',
		name: ''
	};

	select = (player) => {
		let name;
		if (player === 'patient') {
			name = ''
		}
		const identity = player === 'patient' ? 1 : 2;

		this.setState({
			identity,
			name
		});
	};


	goMain = () => {
		const {identity, name} = this.state;
		this.props.updataUserType({identity, name});
	};

	render() {
		const {identity, phone} = this.props.user;

		if (identity) {
			return <Redirect to={getRedirectTo(identity, phone)}/>
		}

		const selected = this.state.identity === 1 ? 'patient' : 'doctor';

		return (
			<div className={'selector-player'}>
				<div
					className={selected === 'doctor' ? 'player selected' : 'player'}
					onClick={() => this.select('doctor')}
				>
					<img src={require(`./img/doctor-${selected === 'doctor' ? 's' : ''}@3x.png`)} alt=""/>
					<span>我是</span>
					<input
						className={'name'}
						type="text"
						placeholder={'请输入姓名'}
						onChange={e => this.setState({name: e.target.value})}
					/><span>医生</span>
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
		getUser
	}
)(SelectPlayer);
