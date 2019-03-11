import React, {Component} from 'react';
import {connect} from 'react-redux';
import DocList from '../../../components/DocList/DocList'

import {Redirect} from "react-router-dom";

import {NavBar, Icon, WhiteSpace} from "antd-mobile";

class SearchResult extends Component {
	render() {
		const DoctorListData = this.props.doctorList.list;
		if (DoctorListData[0].id === 0) {
			return <Redirect to='/patient-index'/>
		}

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

				<DocList doctorList={DoctorListData}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		doctorList: state.doctorList
	};
}

export default connect(
	mapStateToProps,
)(SearchResult);
