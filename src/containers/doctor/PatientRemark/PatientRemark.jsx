import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PatientRemark.less';
import {NavBar, Icon, List, InputItem, Toast, Modal} from "antd-mobile";
import WhiteSpace from "antd-mobile/lib/white-space";
import {reqAddLabel, reqSubscribeDelete, reqChatNote} from "../../../api/doctor";
import {addPatienLabel, getAcceptPatient, getLabelList, getPatientDetail, updataPatientLabel} from "../../../redux/doctor/action";

const Item = List.Item;
const prompt = Modal.prompt;

// todo:添加备注

// todo: 添加标签


class PatientRemark extends Component {
	state = {
		note: ''
	};

	componentDidMount() {
		const id = this.props.match.params.patientId;
		// todo：无法获取用户详情，标签显示问题
		this.props.getPatientDetail(id);
	}

	addPainTag = painTag => {
		return new Promise((resolve, reject) => {
			const id = this.props.match.params.patientId;
			if (!painTag) {
				Toast.fail('请填写标签', 1);
				return reject()
			}
			reqAddLabel({id, new_label: painTag})
				.then(res => {
					if (res.code === 1) {
						this.props.addPatienLabel();
						this.props.getLabelList();
						this.props.getPatientDetail(id);
						Toast.success(res.message, 1)
					} else {
						Toast.fail(res.message)
					}
					return resolve()
				})
		})
	};

	seletLabel = label => {

		const id = this.props.match.params.patientId;

		reqAddLabel({id, label: label.id})
			.then(res => {
					if (res.code === 1) {
						this.props.updataPatientLabel({label: label.label});
						Toast.success(res.message, 1);
					} else {
						Toast.fail(res.message);
					}
				}
			)
	};

	deletePatient = () => {
		const id = this.props.match.params.patientId;
		reqSubscribeDelete(id)
			.then(
				res => {
					if (res.code === 1) {
						Toast.success(res.messsage, 1, () => this.props.history.replace('/new-patient'))
					} else {
						Toast.fail(res.messsage)
					}
				}
			)
	};

	changeName = () => {
		const id = this.props.match.params.patientId;
		const note = this.state.note;
		reqChatNote({id, note})
			.then(res => {
				if (res.code) {
					this.props.history.goBack();
				} else {
					Toast.fail(res.message, 1)
				}

			})
	};

	render() {
		const {patientDetail, labelList} = this.props;
		const labels = labelList.map(label => ({label: label.label_name, id: label.id}));

		return (
			<div className='patient-remark'>
				<NavBar
					mode="light"
					icon={<Icon type="left" color={'#000'} size={'md'}/>}
					onLeftClick={() => this.props.history.goBack()}
					rightContent={<div
						className={'button'}
						onClick={this.changeName}
					>完成</div>}
				>病人信息</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<WhiteSpace/>
				<List>
					<InputItem
						type='text'
						placeholder='请输入姓名'
						onChange={note => this.setState({note})}
					>
						备注姓名
					</InputItem>
				</List>

				<WhiteSpace/>

				<List>
					<Item>
						给患者添加标签
						<span className={'pain-detail'}>(添加病症给患者分类)</span>
						<WhiteSpace/>
						<div className={'tag'}>
							{
								labels.map(({label, id}) =>
									<span
										key={id}
										className={patientDetail.label === label ? 'pain active' : 'pain'}
										onClick={() => this.seletLabel({label, id})}
									>{label}</span>
								)
							}
							<span
								className='pain'
								onClick={() => prompt(
									'添加患者分类',
									null,
									[
										{
											text: '关闭',
											onPress: () => {
											}
										},
										{
											text: '添加',
											onPress: painTag => this.addPainTag(painTag)

										},
									], 'default', null, [' 请输入标签'])}
							>+</span>
						</div>
						<WhiteSpace/>
					</Item>
				</List>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		patientDetail: state.patientDetail,
		labelList: state.labelList
	};
}

export default connect(
	mapStateToProps,
	{
		getPatientDetail,
		getAcceptPatient,
		updataPatientLabel,
		addPatienLabel,
		getLabelList
	}
)(PatientRemark);
