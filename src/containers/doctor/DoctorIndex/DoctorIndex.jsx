import React, {Component} from 'react';
import {connect} from 'react-redux';
import './DoctorIndex.less'

import {reqChatList} from "../../../api/doctor";

import LoadingMore from '../../../components/LoadIngMore/LoadingMore'

import {
	Result,
	WhiteSpace,
	List,
	// Badge,
	SearchBar,
	Modal,
	Badge
} from 'antd-mobile';
import {readMessage} from "../../../redux/chat/action";


const Item = List.Item;
const Brief = Item.Brief;

function closest(el, selector) {
	// noinspection JSUnresolvedVariable
	const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
	while (el) {
		if (matchesSelector.call(el, selector)) {
			return el;
		}
		el = el.parentElement;
	}
	return null;
}

// fixMe: 病人列表 => 忘记啥问题了。。。
class DoctorIndex extends Component {
	state = {
		page: 1,
		total: 100,
		modal: false,
		pain: [],
		chatList: [],
		lavel: '',
		name: ''
	};

	componentDidMount() {
		this.getChatList()
	}

	componentWillUnmount() {
		this.setState = () => null
	}


	getChatList = () => {
		const {chatList, page, pain: lavel, name} = this.state;
		reqChatList({page, name, lavel: lavel[0]})
			.then(
				res => {
					if (res.code === 1) {
						this.setState(
							{
								loading: false,
								chatList: [...chatList, ...res.data.list],
								page: res.data.current_page + 1,
								total: res.data.total
							}
						)
					}
				}
			)
	};

	getChatListbyName = (name) => {
		// _.debounce(
		this.setState({
			name,
			page: 1,
			chatList: []
		}, this.getChatList);
		// , 1000);};
	};

	showModal = key => (e) => {
		console.log(e);
		// e.preventDefault(); // 修复 Android 上点击穿透
		this.setState({
			[key]: true,
		});
	};

	onClose = key => () => {
		this.setState({
			[key]: false,
		});
	};

	onWrapTouchStart = (e) => {
		// fix touch to scroll background page on iOS
		if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
			return;
		}
		const pNode = closest(e.target, '.am-modal-content');
		if (!pNode) {
			e.preventDefault();
		}
	};

	selectPain = select => {
		let pain = this.state.pain;
		if (pain.includes(select)) {
			let index = pain.findIndex(item => item === select);
			pain.splice(index, 1)
		} else {
			pain = [...pain, select];
			pain = Array.from(new Set(pain));
		}
		this.setState({
			page: 1,
			chatList: [],
			pain
		});
	};

	render() {
		const {name, avatar} = this.props.user;
		const {chatMsg} = this.props;
		const {chatList, page, loading, total} = this.state;
		const {labelList} = this.props;
		const labels = labelList.map(label => {
			if (label.label_name) {return {label_name: label.label_name, id: label.id}} else {return {label_name: null, id: null}}
		});

		return (
			<div className="doctor-index">
				<Result
					img={<img
						className='avator'
						src={avatar}
						alt=""
					/>}
					title={<p className={'name'}>{name} <img className={'sex'} src={require('./img/male@3x.png')} alt=""/></p>}
					onClick={() => {
						this.props.history.push('/change-avatar-and-name')
					}}
				/>
				<WhiteSpace/>

				{/*移除查看新增患者功能*/}
				{/*<List>*/}
				{/*<Item*/}
				{/*thumb={<img src={require('./img/Medical@3x.png')} alt=""/>}*/}
				{/*arrow={'horizontal'}*/}
				{/*extra={<Badge text={77} overflowCount={99}/>}*/}
				{/*onClick={() => this.props.history.push('/new-patient')}*/}
				{/*>新增患者</Item>*/}
				{/*</List>*/}

				{/*<WhiteSpace/>*/}


				<List>
					<Item
					>
						<SearchBar
							placeholder="患者姓名"
							maxLength={8}
							showCancelButton
							cancelText={<img src={require('./img/shaixuan@3x.png')} alt=""/>}
							onCancel={this.showModal('modal')}
							onChange={name => this.getChatListbyName(name)}
						/>
						<WhiteSpace/>
					</Item>


					{/*病人列表*/}

					{
						chatList.map(item =>
							<Item
								key={item.id}
								onClick={() => {
									this.props.readMessage(item.chat_room);
									this.props.history.push('/message/' + item.chat_room)
								}}
								thumb={
									<Badge dot={chatMsg.some(chat => chat.chat_room === item.chat_room) && chatMsg
										.filter(chat => chat.chat_room === item.chat_room)
										.some(msg => msg.read === false)}>
										<img className='patient-avator' src={item.avatar} alt=""/>
									</Badge>}
								multipleLine
							>
								{item.name}
								<Brief>
									<p className='patient-message'>
										{chatMsg.some(chat => chat.chat_room === item.chat_room) ? chatMsg.filter(chat => chat.chat_room === item.chat_room).pop().message || '图片' : '暂无聊天记录'}

										<span className={'time'}>
											{chatMsg.some(chat => chat.chat_room === item.chat_room) ? new Date(chatMsg.filter(chat => chat.chat_room === item.chat_room).pop().time).toLocaleString() || '' : ''}
										</span>
									</p>
								</Brief>
							</Item>
						)
					}
				</List>

				<LoadingMore page={page} total={total} callback={this.getChatList} loading={loading}/>

				{/*弹出层*/}
				<Modal
					className={'pain'}
					visible={this.state.modal}
					transparent
					maskClosable={false}
					onClose={this.onClose('modal')}
					title={'病症'}
					wrapProps={{onTouchStart: this.onWrapTouchStart}}
					afterClose={this.getChatList}
				>
					<div style={{height: 300, overflow: 'scroll'}}>
						<div className='list'>
							{labels.map(({id, label_name}) =>
								<div className={this.state.pain.includes(label_name) ? 'item active' : 'item'}
										 key={id}
										 onClick={() => this.selectPain(label_name)}
								>{label_name}
								</div>)
							}
						</div>
					</div>


					<div className={'footer'}>
						<div className={'button'}
								 onClick={() => this.setState({pain: []})}>清空
						</div>
						<div className={'button'}
								 onClick={this.onClose('modal')}
						>完成
						</div>
					</div>
				</Modal>


				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
			</div>
		);
	}
}

function

mapStateToProps(state) {
	return {
		user: state.user,
		chatMsg: state.chatMsg,
		labelList: state.labelList,
	};
}

export default connect(
	mapStateToProps, {
		readMessage
	}
)(DoctorIndex);
