import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, Icon, WhiteSpace, InputItem, Toast} from "antd-mobile";

import {sendRoomText, doSendImg, deleteChat, readMessage} from "../../../redux/chat/action";
import {reqChatUserInfo, reqDelete} from "../../../api";

import './Message.less';

class Message extends Component {
	state = {
		inputType: 'input',
		input: '',
		menuShow: false,
		users: [],
		show_big_pic: false,
		big_pic_url: ''
	};

	componentDidMount() {
		const chat_room = this.props.match.params.chat_room;
		reqChatUserInfo(chat_room)
			.then(
				res => {
					this.setState({users: res.data})
				}
			);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		window.onscroll = () => {
		};
		window.scrollTo(0, document.documentElement.scrollHeight);
	}

	camera = () => {
		document.querySelector('#camera').click()
	};

	sendMessage(e, username, only_no) {
		const {input} = this.state;
		if ((e === 'sendMsg' || e.key === 'Enter' || e.keyCode === 13) && input) {
			const id = this.props.match.params.chat_room;
			this.setState({input: ''});
			this.props.sendRoomText(input, id, username, only_no);
		}
	}

	selectImg = () => {
		document.querySelector('#image').click()
	};

	sendImg = (username, type) => {
		const id = this.props.match.params.chat_room;
		this.props.doSendImg(id, username, type);
		this.setState({
			menuShow: false
		})
	};

	changeInputType = (inputType) => {
		console.log(inputType);
		this.setState(
			{
				inputType: inputType === 'input' ? 'speak' : 'input'
			})
	};

	deleteRelation = () => {
		const chat_room = this.props.match.params.chat_room;
		reqDelete(chat_room)
			.then(
				res => {
					if (res.code === 1) {
						this.props.deleteChat(chat_room);
						Toast.success(res.message, 1, () => this.props.history.replace('/doctor-index'))
					} else {
						Toast.fail(res.message, 1)
					}
				}
			)
	};

	showBigPic = (e, img_url) => {
		e.cancelBubble = true;
		e.stopPropagation();
		let {show_big_pic} = this.state;
		this.setState({
			show_big_pic: !show_big_pic,
			big_pic_url: img_url
		})
	};

	handleChange = (name, val) => {
		this.setState(
			{
				[name]: val
			}
		)
	};

	showKeyboard = () => {
		// 调起输入法后上拉输入框
		setTimeout(function () {
			let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
			window.scrollTo(0, Math.max(scrollHeight - 1, 0));
		}, 300);
		this.setState({
			menuShow: false
		})
	};

	render() {
		const {input, inputType, menuShow, users, big_pic_url, show_big_pic} = this.state;
		const {identity} = this.props.user;
		const {username} = this.props.user;
		const {chatMsg} = this.props;
		const chat_room = this.props.match.params.chat_room;
		if (!users.length) { return null }
		// 导航栏 显示的名字
		const person = identity === 'patient' ? users.filter(user => user.identity === '2')[0].name : users.filter(user => user.identity === '1')[0].name;
		// only_no
		const only_no_patient = users.filter(user => user.identity === '1')[0].only_no;
		const only_no_doctor = users.filter(user => user.identity === '2')[0].only_no;
		// 存储only_no 转诊页面使用
		sessionStorage.only_no_doctor = only_no_doctor;
		sessionStorage.only_no_patient = only_no_patient;
		const only_no = identity === 'patient' ? only_no_patient : only_no_doctor;
		// 当前聊天室的聊天信息
		const msg = chatMsg.filter(chat => chat.chat_room === this.props.match.params.chat_room);
		const patientId = users.filter(user => user.identity === '2')[0].id;
		// 聊天（环信）的名字
		const doctorName = users.filter(user => user.identity === '2')[0].username;
		const patientName = users.filter(user => user.identity === '1')[0].username;
		// 医生发信息的需要打赏的匹配时间
		const doctorBackInformationTime = msg.filter(chat => chat.username !== patientName).filter((item, index) => index % 3 === 2).map(show => show.time);
		// const doctorBackInformationTime = msg.filter(chat => chat.username === doctorName).length >= 4 ? msg.filter(chat => chat.username === doctorName)[3].time : null;

		localStorage.username = username;
		localStorage.only_no = only_no;
		localStorage.id = this.props.match.params.chat_room;

		return (
			<div className={'message'}>
				<NavBar
					mode="light"
					icon={<Icon type="left" color={'#000'} size={'md'}/>}
					onLeftClick={() => {
						this.props.readMessage(chat_room);
						this.props.history.push(identity === 'patient' ? '/doctor-chat-list' : '/doctor-index')
					}}
					rightContent={
						identity === 'doctor' ?
							<Icon
								type='ellipsis'
								size='md'
								color={'#000'}
								onClick={() => this.props.history.push('/patient-remark/' + patientId)}
							/> : null}
				>{person}</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				{/*聊天内容*/}
				<div className={'chat'}>
					{msg.map(chat =>
						<div key={chat.time}>
							{/*时间显示*/}
							{chat.time && <span className='chat-time tips-alert'>{new Date(chat.time).toLocaleString()}</span>}
							<br/>
							{/*打赏提醒*/}
							{identity === 'patient' && doctorBackInformationTime.includes(chat.time) ? <span className='tips-alert'>如果您觉得医生的回复对您有帮助，请赞赏一下吧！</span> : null}
							{/*聊天内容*/}
							<WhiteSpace/>
							{users.filter(user => user.username === chat.username).length ?
								<div className={username === chat.username ? 'to' : 'from'}>
									<div className='avatar'>
										{/*聊天头像*/}
										<img src={chat.username === patientName ? users.filter(user => user.username === patientName)[0].avatar : users.filter(user => user.username === doctorName)[0].avatar} alt=""/>
										{/*<span className='name'>{users.filter(user => user.username === chat.username)[0].name}</span>*/}
									</div>
									{chat.message ? <span className='message-data'>
										{chat.message}
										{users.filter(user => user.username === chat.username)[0].username !== patientName && identity === 'patient' ? <div className={'reminder'}>郑重提示：线上咨询不能代替面诊，医生建议仅供参考!</div> : null}
									</span> : null}
									{chat.imgUrl ? <img className={chat.imgUrl === big_pic_url && show_big_pic ? 'big-img message-img' : 'message-img'} onTouchEnd={e => this.showBigPic(e, chat.imgUrl)} src={chat.imgUrl} alt="图片已失效"/> : null}
									{chat.imgUrl === big_pic_url && show_big_pic && <div className='big-img-back' onTouchEnd={e => this.showBigPic(e, '')}>{null}</div>}
								</div> : null
							}
							<WhiteSpace/>
						</div>
					)}
				</div>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				{/*打赏*/}
				<div className='bottom-input'>
					{identity === 'patient' ?
						<div className='tip'
								 onClick={() => this.props.history.push('/tips/' + this.props.match.params.chat_room)}
						>
							<img src={require('./img/qianbao.png')} alt=""/>
						</div>
						: null
					}

					{/*输入框*/}
					<div className={'speak-input-wrap'}>
						<div className={'voice'}>
							{/*<img*/}
							{/*src={require('./img/jianpan-@3x.png')}*/}
							{/*onClick={() => this.changeInputType(inputType)}*/}
							{/*alt=""/>*/}
							{
								inputType === 'input' ? <div style={{width: '70%'}}>
										<InputItem
											type='text'
											placeholder={'请输入...'}
											onChange={val => this.handleChange('input', val)}
											onFocus={this.showKeyboard}
											onBlur={this.showKeyboard}
											onKeyDown={e => this.sendMessage(e, username, only_no)}
											value={input}
										/>
									</div> :
									<div className={'speak'}>
										按住说话
									</div>
							}
							{/*<img src={require('./img/biaoqing@3x.png')} alt=""/>*/}
							<img src={require('./img/tianjia-3@3x.png')}
									 onClick={() => this.setState({menuShow: !menuShow})}
									 alt=""/>
							<button className='send-message' onClick={() => this.sendMessage('sendMsg', username, only_no)}>发送</button>
						</div>

						{/*弹出框*/}
						<div className='alert' style={{maxHeight: menuShow ? 300 : 0}}>
							<img src={require('./img/xiangji.png')} alt="" onClick={this.camera}/>
							<input id='camera' type="file" name="cover" accept="image/*" capture="camera" hidden onChange={() => this.sendImg(username, 'camera')}/>

							<img src={require('./img/相册@3x.png')} alt="" onClick={this.selectImg}/>
							<input id='image' type="file" hidden onChange={() => this.sendImg(username, 'image')}/>
							{
								identity === 'doctor' ? <img src={require('./img/转诊@3x.png')} alt="" onClick={() => this.props.history.push('/doctor-list/' + only_no_patient)}/> : <img src="" alt=""/>
							}
							{
								identity === 'doctor' ? <img src={require('./img/结束@3x.png')} alt="" onClick={this.deleteRelation}/> : <img src="" alt=""/>
							}
						</div>


					</div>
				</div>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		chatMsg: state.chatMsg
	};
}

export default connect(
	mapStateToProps,
	{
		sendRoomText,
		doSendImg,
		deleteChat,
		readMessage,
	}
)(Message);
