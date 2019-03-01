import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.less'
import {Redirect} from "react-router-dom";

import {
	updataUserType
} from "../../redux/user/actions";

import {getRedirectTo} from "../../utils";
import {InputItem} from "antd-mobile";

class SelectPlayer extends Component {


	state = {
		identity: '',
		name: ''
	};

	select = (player) => {
		if (player==='patient'){
			this.setState({
				name:''
			})
		}
		this.setState({
			identity: player === 'paitent' ? 1 : 2
		});
	};


	goMain = () => {
		const {identity, name} = this.state;
		this.props.updataUserType({identity, name});
	};

	render() {
		const {identity, phone} = this.props.user;

		if (!phone || identity) {
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
					<InputItem
						className={'name'}
						type="text"
						placeholder={'请输入姓名'}
						onChange={val => this.setState({name: val})}
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
	}
)(SelectPlayer);
