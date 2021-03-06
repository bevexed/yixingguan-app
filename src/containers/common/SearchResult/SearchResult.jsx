import React, {Component} from 'react';
import {connect} from 'react-redux';
import DocList from '../../../components/DocList/DocList'

import {NavBar, Icon, WhiteSpace, Toast} from "antd-mobile";
import {reqReferrals} from "../../../api/doctor";


class SearchResult extends Component {

	doReferrals = url => {
		const only_no = sessionStorage.only_no_patient;
		reqReferrals({only_no, url})
			.then(res => {
				if (res.code === 1) {
					Toast.success(res.message, 1);
					const {id, username, only_no} = localStorage;
					this.props.sendRoomText(url, id, username, only_no);
				} else {
					Toast.fail(res.message, 1)
				}
			})
	};

	render() {
		const {doctorList} = this.props;
		const {identity, only_no: only_no_doctor} = this.props.user;

		return (
			<div>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>
					搜索结果
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<DocList doctorList={doctorList} doReferrals={this.doReferrals} identity={identity} only_no_doctor={only_no_doctor}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		doctorList: state.seekDoctorList
	};
}

export default connect(
	mapStateToProps,
)(SearchResult);
