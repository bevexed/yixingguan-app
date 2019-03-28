import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, Icon, WhiteSpace, InputItem, Toast} from "antd-mobile";

import {sendRoomText, doSendImg} from "../../../redux/chat/action";
import {reqChatUserInfo, reqDelete} from "../../../api";


import './Message.less';

class Message extends Component {
	state = {
		inputType: 'input',
		input: '',
		menuShow: false,
		users: []
	};

	componentDidMount() {
		const id = this.props.match.params.to;
		reqChatUserInfo(id)
			.then(
				res => {
					this.setState({users: res.data})
				}
			)
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		window.scrollTo(0, document.documentElement.scrollHeight);
	}

	camera = () => {
		document.querySelector('#camera').click()
	};

	sendMessage(e, username) {
		const {input} = this.state;
		if ((e === 'sendMsg' || e.key === 'Enter' || e.keyCode === 13) && input) {
			const id = this.props.match.params.to;
			this.setState({input: ''});
			this.props.sendRoomText(input, id, username);
		}
	}

	selectImg = () => {
		document.querySelector('#image').click()
	};

	sendImg = (username, type) => {
		const id = this.props.match.params.to;
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
		const chat_room = this.props.match.params.to;
		reqDelete(chat_room)
			.then(
				res => {
					if (res.code === 1) {
						Toast.success(res.message, 1, () => this.props.history.replace('/doctor-index'))
					} else {
						Toast.fail(res.message, 1)
					}
				}
			)
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
		const {input, inputType, menuShow, users} = this.state;
		const {identity} = this.props.user;
		const {username} = this.props.user;
		const {chatMsg} = this.props;
		if (!users.length) { return null }
		const person = identity === 'patient' ? users.filter(user => user.identity === '2')[0].name : users.filter(user => user.identity === '1')[0].name;
		const msg = chatMsg.filter(chat => chat.chat_room === this.props.match.params.to);
		const patientId = users.filter(user => user.identity === '2')[0].id;
		const doctorName = users.filter(user => user.identity === '2')[0].username;
		const doctorBackInformationTime = msg.filter(chat => chat.username === doctorName).length >= 4 ? msg.filter(chat => chat.username === doctorName)[3].time : null;

		return (
			<div className={'message'}>
				<NavBar
					mode="light"
					icon={<Icon type="left" color={'#000'} size={'md'}/>}
					onLeftClick={() => this.props.history.push(identity === 'patient' ? '/doctor-chat-list' : '/doctor-index')}
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
							{/*打赏提醒*/}
							{doctorBackInformationTime === chat.time ? <span className='tips-alert'>医生那么辛苦打赏一点小费吧</span> : null}
							{/*聊天内容*/}
							<WhiteSpace/>
							{users.filter(user => user.username === chat.username).length ?
								<div className={username === chat.username ? 'to' : 'from'}>
									<div className='avatar'>
										<img src={users.filter(user => user.username === chat.username)[0].avatar} alt=""/>
										{/*<span className='name'>{users.filter(user => user.username === chat.username)[0].name}</span>*/}
									</div>
									{chat.message ? <span className='message-data'>{chat.message}</span> : null}
									{chat.imgUrl ? <img className='message-img' src={chat.imgUrl} alt=""/> : null}
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
				<div className={'bottom-input'}>
					{identity === 'patient' ?
						<div className={'tip'}
								 onClick={() => this.props.history.push('/tips/' + this.props.match.params.to)}
						>
							<img src={require('./img/分组@3x.png')} alt=""/>
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
											onKeyDown={e => this.sendMessage(e, username)}
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
							<button className='send-message' onClick={() => this.sendMessage('sendMsg', username)}>发送</button>
						</div>

						{/*弹出框*/}
						<div className='alert' style={{maxHeight: menuShow ? 300 : 0}}>
							<img src={require('./img/拍照@3x.png')} alt="" onClick={this.camera}/>
							<input id='camera' type="file" name="cover" accept="image/*" capture="camera" hidden onChange={() => this.sendImg(username, 'camera')}/>

							<img src={require('./img/相册@3x.png')} alt="" onClick={this.selectImg}/>
							<input id='image' type="file" hidden onChange={() => this.sendImg(username, 'image')}/>
							{
								identity === 'doctor' ? <img src={require('./img/转诊@3x.png')} alt="" onClick={() => this.props.history.push('/doctor-list')}/> : <img src="" alt=""/>
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
		doSendImg
	}
)(Message);
