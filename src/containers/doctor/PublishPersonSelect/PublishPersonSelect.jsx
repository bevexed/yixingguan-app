import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, List, Checkbox, WhiteSpace, Modal} from "antd-mobile";
import {selectSomeCanSee} from "../../../redux/publish/action";

import './PublishPersonSelect.less'

const CheckboxItem = Checkbox.CheckboxItem;

class PublishPersonSelect extends Component {

	user = [];
	names = [];

	onSeleted = (label, id, name) => {
		let {user, names} = this;
		if (user.includes(id)) {
			user.splice(user.findIndex(item => item === id), 1)
		} else {
			user.push(id);
			names.push(name)
		}
		user = [...new Set([...user])];
		names = [...new Set([...names])];
		this.props.selectSomeCanSee({label, user, names});
	};

	selectAll = (label, all) => {
		let {user, names} = this;
		const length = Object.values(all).length;
		if (user.length < length) {
			Object.values(all).map(patients => patients.forEach(patient => user.push(patient[0])));
			Object.values(all).map(patients => patients.forEach(patient => names.push(patient[1])));
		} else {
			user = [];
		}
		user = [...new Set([...user])];
		names = [...new Set([...names])];
		this.props.selectSomeCanSee({label, user, names});
	};

	onSureSelect = label => {
		this.props.history.goBack();
	};

	render() {
		const {labelList, whoCanSee} = this.props;
		const label_id = parseInt(this.props.match.params.label_id);
		const patients = labelList.filter(label => label.id === label_id);
		const label_name = patients[0] ? patients[0].label_name : '';
		const patientList = patients[0] ? patients[0].user_names ? patients[0].user_names : {} : {};
		const allow_users = whoCanSee.allow_users.filter(sort => sort.label === label_name);
		const seletPerson = allow_users[0] ? allow_users[0].user : [];
		this.user = [...seletPerson];
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
					<CheckboxItem
						onChange={() => this.selectAll(label_name, patientList)}
						checked={Object.values(patientList).length === this.user.length}
					>
						全部
					</CheckboxItem>
				</List>
				<WhiteSpace/>

				<List>
					{
						// patients => [[id,name],[id,name]]
						Object.values(patientList).map(patients =>
							patients.map(([id, name]) =>
								<CheckboxItem
									checked={seletPerson.includes(id)}
									key={id}
									onChange={() => this.onSeleted(label_name, id, name)}
								>
									{name}
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
