import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, List, Checkbox, WhiteSpace} from "antd-mobile";
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

	onSureSelect = label => {
		// console.log(label_name);
		// console.log(this.user);
		this.props.selectSomeCanSee({label, user: this.user});

	};


	render() {
		const {labelList} = this.props;
		const label_id = parseInt(this.props.match.params.label_id);
		const patients = labelList.filter(label => label.id === label_id);
		const label_name = patients[0] ? patients[0].label_name : {};
		const patientList = patients[0] ? patients[0].user_names : {};

		// todo: 左侧标签栏
		const initial = Object.keys(patientList);

		return (
			<div className='publish-person-select'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
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
					<CheckboxItem onChange={() => this.onSeleted()}>
						全部
					</CheckboxItem>
				</List>
				<WhiteSpace/>

				<List>
					{
						// patients => [[id,name],[id,name]]
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
	{
		selectSomeCanSee
	}
)(PublishPersonSelect);
