import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Register.less'

class SelectPlayer extends Component {

	state = {
		selected: 'doctor'
	};

	select = (player) => {
		this.setState({
			selected: player
		})
	};

	render() {
		const selected = this.state.selected;
		console.log(selected);
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
					onClick={()=>this.props.history.replace(`/${selected}-index`)}
				>进入</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(SelectPlayer);
