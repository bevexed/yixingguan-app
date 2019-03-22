import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, Icon, WhiteSpace, InputItem} from "antd-mobile";

import {sendRoomText, doSendImg} from "../../../redux/chat/action";
import {reqChatUserInfo} from "../../../api";

import './Message.less';

// todo：提示赞赏医生

// todo:添加备注

// todo: 添加标签

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
		if (e.key !== 'Enter' || e.keyCode !== 13 || !input) {
			return
		}
		const id = this.props.match.params.to;
		this.setState({input: ''});
		this.props.sendRoomText(input, id, username);
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

		return (
			<div className={'message'}>
				<NavBar
					mode="light"
					icon={<Icon type="left" color={'#000'} size={'md'}/>}
					onLeftClick={() => this.props.history.push(identity === 'patient' ? '/doctor-chat-list' : '/doctor-index')}
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
							{users.filter(user => user.username === chat.username).length ?
								<div className={username === chat.username ? 'to' : 'from'}>
									<div className='avatar'>
										<img src={users.filter(user => user.username === chat.username)[0].avatar} alt=""/>
										<span className='name'>{users.filter(user => user.username === chat.username)[0].name}</span>
									</div>
									{chat.message ? <span className='message-data'>{chat.message}</span> : null}
									{chat.imgUrl ? <img className='message-img' src={chat.imgUrl} alt=""/> : null}
								</div> : null
							}
							<WhiteSpace/>
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
							<img src={require('./img/biaoqing@3x.png')} alt=""/>
							<img src={require('./img/tianjia-3@3x.png')}
									 onClick={() => this.setState({menuShow: !menuShow})}
									 alt=""/>
						</div>

						{/*弹出框*/}
						<div className='alert' style={{height: menuShow ? 110 : 0}}>
							<img src={require('./img/拍照@3x.png')} alt="" onClick={this.camera}/>
							<input id='camera' type="file" name="cover" accept="image/*" capture="camera" hidden onChange={() => this.sendImg(username, 'camera')}/>
							<img src={require('./img/相册@3x.png')} alt="" onClick={this.selectImg}/>
							<input id='image' type="file" hidden onChange={() => this.sendImg(username, 'image')}/>
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
