import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDoctorDetail} from "../../../redux/user/action";

import './OrderDoctor.less'

import {subscribes} from "../../../api/patient";

import {
	Badge,
	Card,
	List,
	// Accordion,
	Icon,
	WhiteSpace,
	InputItem,
	TextareaItem,
	ImagePicker,
	NavBar, Toast
} from "antd-mobile";
import {reqSendMessage} from "../../../api";
import {GetQueryString} from "../../../utils";

const Header = Card.Header;
const Footer = Card.Footer;

const Item = List.Item;
const Brief = Item.Brief;

class OrderDoctor extends Component {
	state = {
		files: [],
		phone: '',
		auth_code: '',
		symptoms_described: '',
		name: '',

		sendable: true
	};

	componentDidMount() {
		this.props.getDoctorDetail(this.props.match.params.docId, this.props.history);
	}

	componentWillUnmount() {
		this.setState = () => {
			return false
		};
	}

	time = 60;

	getCode = () => {

		const {phone: mobile, sendable} = this.state;
		const template_id_code = 'SMS_162110919';

		if (!mobile || mobile.length < 11) {
			Toast.fail('手机号格式有误', 1);
			return
		}

		if (!sendable) {
			Toast.fail(this.time + 's后再试', 1);
			return
		}

		const t = setInterval(() => {
			this.setState({sendable: false});
			this.time--;
			if (this.time < 0) {
				this.time = 60;
				this.setState({sendable: true});
				clearInterval(t)
			}
		}, 1000);


		reqSendMessage({mobile: mobile.replace(/\s+/g, ""), template_id_code})
			.then(
				res => {
					if (res.code === 1) {
						Toast.success(res.message)
					} else {
						Toast.fail(res.message)
					}
				}
			)

	};

	onChange = (key) => {
		console.log(key);
	};

	onHandleChange = (name, val) => {
		this.setState({
			[name]: val
		})

	};


	orderDoctor = () => {
		let only_no = GetQueryString('only_no');

		const {name, phone, auth_code, symptoms_described, files} = this.state;
		const inspection_report = files.map(img => img.url);
		const patientData = {
			only_no,
			name,
			d_id: this.props.match.params.docId,
			phone: phone.replace(/\s+/g, ""),
			auth_code,
			symptoms_described,
			inspection_report
		};

		if (!name) {
			Toast.fail('请输入姓名', 1);
			return
		}

		if (!phone) {
			Toast.fail('请输入电话号码', 1);
			return
		}
		if (!auth_code) {
			Toast.fail('请输入验证码', 1);
			return
		}
		if (!symptoms_described) {
			Toast.fail('请填写病情描述', 1);
			return
		}
		if (!inspection_report.length) {
			Toast.fail('请选择上传图片', 1);
			return
		}

		subscribes({...patientData}).then(
			res => {
				if (res.code === 1) {
					Toast.success(res.message, 1, () => this.props.history.replace('/patient-index'));
				} else {
					Toast.fail(res.message, 1);
				}
			}
		)
	};

	toDetail = () => {
		this.props.history.push('/DOC')
	};


	render() {
		const {files, sendable} = this.state;
		const {doctorDetail} = this.props;
		return (
			<div className={'order-doc'}>

				<Card
					full
				>
					<NavBar
						mode="light"
						icon={<Icon type="left" color={'#fff'} size={'lg'}/>}
						onLeftClick={() => this.props.history.goBack()}
					><span style={{color: '#fff'}}>医生</span></NavBar>
					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>


					<Header
						style={{background: '#68e3ce', padding: 10}}
						thumb={<img className='header-img' src={doctorDetail.avatar} alt=""/>}
						title={
							<div>
								<header className={'title'}>
									<span className={'name'}>{doctorDetail.name}</span>
									<span className={'subject'}>{doctorDetail.department}</span>
									<span className={'level'}>{doctorDetail.with_title}</span>
								</header>

								<section className={'hospital'}>
									<Badge text={doctorDetail.hospital_level}
												 style={{
													 padding: '0 5px',
													 borderRadius: 2,
													 color: '#FFF',
													 background: '#FF9900',
													 fontSize: '12px'
												 }}/>
									<span>{doctorDetail.affiliated_hospital}</span>
								</section>
							</div>
						}
					/>

					<Footer
						style={{background: '#68e3ce', padding: 10}}
						extra={<div style={{display: 'flex', justifyContent: 'flex-end'}}>
							<img height={14} style={{marginRight: 6}} src={require('./img/message.svg')} alt=""/>
							<span style={{color: '#fff'}}> 访问量 {doctorDetail.seeing}</span>
						</div>}
					/>
				</Card>

				<List>
					{/*<Item*/}
					{/*multipleLine*/}
					{/*>擅长:*/}
					{/*<Brief>{doctorDetail.good_at}</Brief>*/}
					{/*</Item>*/}

					<Item
						multipleLine
					>简介:
						<Brief>{doctorDetail.introduction}</Brief>
					</Item>

					{/*<Accordion defaultActiveKey="" onChange={this.onChange}>*/}
					{/*<Accordion.Panel header={<span className={'accordion-header'}>查看详情</span>}>*/}
					{/*<List className="my-list">*/}
					{/*<List.Item>content 1</List.Item>*/}
					{/*<List.Item>content 2</List.Item>*/}
					{/*<List.Item>content 3</List.Item>*/}
					{/*</List>*/}
					{/*</Accordion.Panel>*/}
					{/*</Accordion>*/}
				</List>

				<WhiteSpace/>

				<List renderHeader={() => '患者信息'}>
					<InputItem
						clear
						onChange={val => this.onHandleChange('name', val)}
						placeholder="请输入患者名称"
					>患者名称</InputItem>
					<InputItem
						clear
						type="phone"
						onChange={val => this.onHandleChange('phone', val)}
						placeholder="请输入手机号"
					>手机号</InputItem>
					<InputItem
						clear
						type="number"
						placeholder="请输入验证码"
						onChange={val => this.onHandleChange('auth_code', val)}
						extra={<span className={'code'}>{sendable ? '获取' : this.time + 's'} </span>}
						onExtraClick={() => this.getCode()}
					>验证码</InputItem>

					<TextareaItem
						clear
						title="症状描述"
						rows={4}
						onChange={val => this.onHandleChange('symptoms_described', val)}
						placeholder="请输入详细症状"
					/>

					<div className={'img-pick'}>
						<p>检查报告图片:<span>（病理报告、激光拍片等）会确定您的隐私</span></p>
						<ImagePicker
							files={files}
							length={3}
							onChange={files => {
								this.setState({
									files,
								})
							}}
						/>
					</div>
				</List>
				<div className='detail'><a onClick={this.toDetail} download='预约就医服务细则.doc'>预约前请先查《看就医服务细则》</a></div>
				<div style={{height: 50}}>{null}</div>
				<div className='footer'>
					<span
						onClick={this.orderDoctor}
					>立即预约</span>
				</div>
			</div>

		);
	}
}

function mapStateToProps(state) {
	return {
		doctorDetail: state.doctorDetail,
		user: state.user
	};
}

export default connect(
	mapStateToProps,
	{getDoctorDetail}
)(OrderDoctor);
