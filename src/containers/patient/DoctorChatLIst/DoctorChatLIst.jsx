import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reqPatientList} from "../../../api/patient";
import {deleteChat} from "../../../redux/chat/action";
import {reqDelete} from "../../../api";

import './DoctorChatLIst.less'
import {
	Accordion,
	// Icon,
	NavBar,
	Button,
	WhiteSpace,
	Toast
	, Badge
} from "antd-mobile";
import {readMessage} from "../../../redux/chat/action";

const Panel = Accordion.Panel;

class DoctorChatLIst extends Component {
	state = {
		chatList: [],
	};

	componentDidMount() {
		reqPatientList()
			.then(res => {
				if (res.code === 1) {
					this.setState({chatList: res.data})
				}
			})
	}

	panelChange = (key) => {
		console.log(key);
	};

	toMessage = (el, id) => {
		el.stopPropagation();
		this.props.history.push(`/message/${id}`)
	};

	deleteRelation = chat_room => {
		reqDelete(chat_room)
			.then(
				res => {
					if (res.code === 1) {
						this.props.deleteChat(chat_room);
						Toast.success(res.message, 1, () => this.props.history.reload(true,))
					} else {
						Toast.fail(res.message, 1)
					}
				}
			)
	};

	render() {
		const {chatList} = this.state;
		const {chatMsg} = this.props;

		return (
			<div className='doctors'>
				<NavBar
					mode={'light'}
					// rightContent={
					// 	<Icon
					// 		type={'cross'}
					// 		size={'md'}
					// 		color={'#000'}
					// 		style={{transform: 'rotate(45deg)'}}
					// 		// onClick={() => alert('add')}
					// 	/>}
				>
					我的医生
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<Accordion
					accordion
					className="my-accordion"
					onChange={this.panelChange}
				>
					{chatList.map(doc =>
						<Panel
							className={doc.is_admire ? 'panel' : null}
							key={doc.id}
							header={
								<div className={'content'}
										 onClick={el => {
											 this.props.readMessage(doc.chat_room);
											 this.toMessage(el, doc.chat_room)
										 }}
								>
									<Badge dot={chatMsg.some(chat => chat.chat_room === doc.chat_room) && chatMsg
										.filter(chat => chat.chat_room === doc.chat_room)
										.some(msg => msg.read === false)}>
										<img className={'header-img'} src={doc.avatar} alt=""/>
									</Badge>
									<div className='doc-brief ellipsis'>
										<span className={'name'}>{doc.name}</span>
										<span className={'subject'}>{doc.department}</span>
										<span className={'level'}>{doc.with_title}</span>
										<span className={'hospital'}>{doc.affiliated_hospital}</span>

										<p className={'ellipsis'}>
											{chatMsg.some(chat => chat.chat_room === doc.chat_room) ? chatMsg.filter(chat => chat.chat_room === doc.chat_room).pop().message || '图片' : '暂无聊天记录'}
										</p>
									</div>
								</div>
							}
						>
							<div className='btn-group'>
								<Button onClick={() => this.deleteRelation(doc.chat_room)}>拒绝推送</Button>
								<Button
									onClick={() => this.props.deleteChat(doc.chat_room)}
								>删除聊天记录</Button>
							</div>

						</Panel>
					)}
				</Accordion>


			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		chatMsg: state.chatMsg
	};
}

export default connect(
	mapStateToProps,
	{
		deleteChat,
		readMessage
	}
)(DoctorChatLIst);
