import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, List, Checkbox} from "antd-mobile";

import './PublishPersonSelect.less'

const CheckboxItem = Checkbox.CheckboxItem;

class PublishPersonSelect extends Component {
	render() {
		const {labelList} = this.props;
		const label_id = parseInt(this.props.match.params.label_id);
		const patients = labelList.filter(label => label.id === label_id);
		const patientList = patients[0] ? patients[0].user_names : [];

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
					{patientList.map(name => (
						<CheckboxItem key={name.value} onChange={() => this.onChange(name.value)}>
							{name.label}
						</CheckboxItem>
					))}
					<CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
						Undergraduate<List.Item.Brief>Auxiliary text</List.Item.Brief>
					</CheckboxItem>
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
