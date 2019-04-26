import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reqInvitePatientList} from "../../../api/doctor";
import {Icon, List, NavBar, WhiteSpace} from "antd-mobile";

const Item = List.Item;

class InvitePatientList extends Component {
	state = {
		patientList: []
	};

	componentDidMount() {
		reqInvitePatientList().then(
			res => {
				if (res.code === 1) {
					this.setState({
						patientList: res.data
					})
				}
			}
		)
	}

	render() {

		const {patientList} = this.state;

		return (
			<div>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>
					邀请病人详情
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<List>
					{
						patientList.map(patient =>
							<Item
								thumb={patient.avatar}
							>{patient.name}</Item>
						)}
				</List>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(InvitePatientList);
