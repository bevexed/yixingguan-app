import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.less'
import {Redirect} from "react-router-dom";

import {receiveUser} from "../../redux/actions";

import {getRedirectTo} from "../../utils";

class SelectPlayer extends Component {


	state = {
		selected: 'doctor'
	};

	goMain = () => {
		this.props.receiveUser({
			username: '',
			type: this.state.selected,
			msg: '',
			redirectTo: '' // 需要自动重定向的路由路径
		});
	};

	select = (player) => {
		this.setState({
			selected: player
		})
	};

	render() {
		const type = this.props.user.type;
		if (type) {
			return <Redirect to={getRedirectTo(type)}/>
		}

		const selected = this.state.selected;

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
	{receiveUser}
)(SelectPlayer);
