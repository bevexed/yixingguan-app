import React, {Component} from 'react';
import {connect} from 'react-redux';
import './NewPatient.less'

import Cookie from 'js-cookie';

import {
	NavBar,
	Icon,
	WhiteSpace
} from "antd-mobile";

import {getAcceptPatient} from "../../redux/doctor/actions";


class NewPatient extends Component {

	acceptPtient = (e,id) => {
		e.stopPropagation();
		const token = Cookie.get('token');
		const patient = {id, token};
		this.props.getAcceptPatient(patient)
	};

	render() {
		const {patientList} = this.props;

		return (
			<div className='new-patient'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>新患者</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				{
					patientList.map(patient =>
						<div key={patient.id}
								 onClick={() => this.props.history.push('/patient-detail/' + patient.id)}
						>
							<div className='item'>
								<img style={{height: '40px', marginRight: '15px', borderRadius: '50%'}} src={patient.avatar} alt=""/>
								<div style={{width: '80%'}}>
									<div className={'title'}>{patient.name}</div>
									<div className={'time'}>{patient.apply_time}</div>
								</div>
								{
									patient.is_accept ?
										<div className='accpt'>已接受</div> :
										<div
											className='button'
											onClick={e=>this.acceptPtient(e,patient.id)}
										>接受</div>
								}
							</div>
						</div>
					)
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		patientList: state.patientList
	};
}

export default connect(
	mapStateToProps,
	{
		getAcceptPatient
	}
)(NewPatient);
