import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, List, Checkbox, WhiteSpace, Modal} from "antd-mobile";
import {selectSomeCanSee} from "../../redux/publish/action";

import './PublishPersonSelect.less'

const CheckboxItem = Checkbox.CheckboxItem;

class PublishPersonSelect extends Component {

	user = [];

	onSeleted = id => {
		const {user} = this;
		if (user.includes(id)) {
			user.splice(user.findIndex(item => item === id), 1)
		} else {
			user.push(id)
		}
	};

	selectAll = (label, all) => {
		const {user} = this;
		Object.values(all).map(patients => patients.forEach(patient => user.push(patient[0])));
		this.props.selectSomeCanSee({label, user});
	};

	onSureSelect = label => {
		console.log(this.user);
		this.props.selectSomeCanSee({label, user: this.user});
		this.props.history.goBack();
	};

	render() {
		const {labelList, whoCanSee} = this.props;
		const label_id = parseInt(this.props.match.params.label_id);
		const patients = labelList.filter(label => label.id === label_id);
		const label_name = patients[0] ? patients[0].label_name : '';
		const patientList = patients[0] ? patients[0].user_names : {};
		const allow_users = whoCanSee.allow_users.filter(sort => sort.label === label_name);
		const seletPerson = allow_users[0] ? allow_users[0].user : [];
		// todo: 左侧标签栏
		const initial = Object.keys(patientList);

		return (
			<div className='publish-person-select'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => Modal.alert('', '此次编辑是否保留???', [
						{text: '不保留', onPress: () => this.props.history.goBack()},
						{text: '保留', onPress: () => this.onSureSelect()},
					])}
					rightContent={<div
						className={'button'}
						onClick={() => this.onSureSelect(label_name)}
					>完成</div>}
				>谁可以看</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List>
					<CheckboxItem onChange={() => this.selectAll(label_name, patientList)}>
						全部
					</CheckboxItem>
				</List>
				<WhiteSpace/>

				<List>
					{
						// patients => [[id,name],[id,name]]
						Object.values(patientList).map(patients =>
							patients.map(patient =>
								<CheckboxItem defaultChecked={seletPerson.includes(patient[0])} checked={'a'} key={patient[0]} onChange={() => this.onSeleted(patient[0])}>
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
		labelList: state.labelList,
		whoCanSee: state.whoCanSee
	};
}

export default connect(
	mapStateToProps,
	{
		selectSomeCanSee
	}
)(PublishPersonSelect);
