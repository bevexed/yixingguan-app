import React, {Component} from 'react';
import {connect} from 'react-redux';
import DocList from '../../../components/DocList/DocList'

import {NavBar, Icon, WhiteSpace} from "antd-mobile";

class SearchResult extends Component {
	render() {
		const {doctorList=[]} = this.props;

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

				<DocList doctorList={doctorList}/>
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
