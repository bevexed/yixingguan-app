import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Icon, NavBar, List, WhiteSpace, Modal} from "antd-mobile";

import {getPatientDetail, getAcceptPatient} from "../../redux/doctor/actions";

import Cookie from 'js-cookie';

import './PatientDetail.less'

const Item = List.Item;
const prompt = Modal.prompt;


class PatientDetail extends Component {
	state = {
		painTags: [],
	};

	addPainTag = painTag => {
		const newPainTags = [...this.state.painTags, painTag];
		this.setState({
			painTags: newPainTags
		})
	};

	componentDidMount() {
		const token = Cookie.get('token');
		const id = this.props.match.params.patientId;
		const patient = {id, token};
		if (token) {
			this.props.getPatientDetail(patient)
		}
	}

	acceptPtient = () => {
		const token = Cookie.get('token');
		const id = this.props.match.params.patientId;
		const patient = {id, token};
		this.props.getAcceptPatient(patient)
	};

	render() {
		const {patientDetail, labelList} = this.props;
		const imgs = patientDetail.inspection_report.split(',');
		const labels = labelList.map(label => {
			if (label.label_name) {return label.label_name;} else {return null}
		});


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
								labels.map((pain, index) =>
									<span
										key={index}
										className={patientDetail.label === pain ? 'pain active' : 'pain'}
										// onClick={}
									>{pain}</span>
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
		getAcceptPatient
	}
)(PatientDetail);
