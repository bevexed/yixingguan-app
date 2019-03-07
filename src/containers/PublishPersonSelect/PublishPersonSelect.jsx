import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, List, Checkbox} from "antd-mobile";

import './PublishPersonSelect.less'

const CheckboxItem = Checkbox.CheckboxItem;

class PublishPersonSelect extends Component {

	onSeleted = id => {
		console.log(id);
	};

	render() {
		const {labelList} = this.props;
		const label_id = parseInt(this.props.match.params.label_id);
		const patients = labelList.filter(label => label.id === label_id);
		const patientList = patients[0] ? patients[0].user_names : {};
		const initial = Object.keys(patientList);

		return (
			<div className='publish-person-select'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
					rightContent={<div className={'button'}>完成</div>}
				>谁可以看</NavBar>

				<List renderHeader={() => 'CheckboxItem demo'}>
					{
						// patients=> [[id,name],[id,name]]
						Object.values(patientList).map(patients =>
							patients.map(patient =>
								<CheckboxItem key={patient[0]} onChange={() => this.onSeleted(patient[0])}>
									{patient[1]}
								</CheckboxItem>
							))
					}

				</List>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		labelList: state.labelList
	};
}

export default connect(
	mapStateToProps,
)(PublishPersonSelect);
