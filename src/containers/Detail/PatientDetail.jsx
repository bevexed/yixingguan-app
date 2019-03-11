import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Icon, NavBar, List, WhiteSpace, Modal, Toast} from "antd-mobile";

import {getPatientDetail, getAcceptPatient, updataPatientLabel} from "../../redux/doctor/action";

import {reqAddLabel} from "../../api/doctor";

import './PatientDetail.less'

const Item = List.Item;
const prompt = Modal.prompt;


class PatientDetail extends Component {

	addPainTag = painTag => {

	};

	seletLabel = label => {
		const id = this.props.match.params.patientId;

		reqAddLabel({id, label: label.id})
			.then(
				res => {
					if (res.code === 1) {
						this.props.updataPatientLabel({label: label.label});
						Toast.success(res.message, 1)
					} else {
						Toast.fail(res.message)
					}
				}
			)
	};


	componentDidMount() {
		const id = this.props.match.params.patientId;
		this.props.getPatientDetail(id)
	}

	acceptPtient = () => {
		const id = this.props.match.params.patientId;
		this.props.getAcceptPatient(id)
	};

	render() {
		const {patientDetail, labelList} = this.props;
		const imgs = imgs ? patientDetail.inspection_report.split(',') : [];
		const labels = labelList.map(label => ({label: label.label_name, id: label.id}));


		return (
			<div className={'patient-detail'}>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>
					患者详情
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				{/*患者详情列表*/}
				<List>
					<Item
						extra={patientDetail.name}
					>
						患者姓名
					</Item>
					<Item
						extra={patientDetail.phone}
					>
						手机号码
					</Item>
					<Item wrap>
						病症描述:
						<WhiteSpace/>
						<p className={'pain-detail'}>
							{patientDetail.symptoms_described}
						</p>
					</Item>

					<Item>
						检查报告图片：
						<div className='pic'>
							{imgs.map(img => <img key={img} src={img ? img : null} alt=""/>)}
						</div>
					</Item>

					{/*
						* TODO:添加标签
					*/
					}

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
								className={'pain'}
								onClick={() => prompt(
									'添加患者分类',
									null,
									painTag => this.addPainTag(painTag),
									['请输入分类']
								)}
							>+</span>
						</div>
						<WhiteSpace/>
					</Item>
				</List>

				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				{
					patientDetail.is_accept ?
						<div className={'button'}>
							删除患者
						</div>
						:
						< div
							className={'button'}
							onClick={this.acceptPtient}
						>
							添加患者
						</div>
				}

				<WhiteSpace/>
				<WhiteSpace/>

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
		updataPatientLabel
	}
)(PatientDetail);
