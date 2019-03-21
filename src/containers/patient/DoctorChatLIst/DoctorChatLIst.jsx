import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reqPatientList} from "../../../api/patient";

import './DoctorChatLIst.less'
import {
	Accordion,
	Icon,
	NavBar,
	Button, WhiteSpace
} from "antd-mobile";

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

	render() {
		const {chatList} = this.state;
		const {chatMsg} = this.props;

		return (
			<div className={'doctors'}>
				<NavBar
					mode={'light'}
					rightContent={
						<Icon
							type={'cross'}
							size={'md'}
							color={'#000'}
							style={{transform: 'rotate(45deg)'}}
							onClick={() => alert('add')}
						/>}
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
							className={doc ? 'panel' : null}
							key={doc.id}
							header={
								<div className={'content'}
										 onClick={el => this.toMessage(el, doc.chat_room)}
								>
									<img className={'header-img'} src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2825443055,3654672452&fm=27&gp=0.jpg" alt=""/>
									<div className={'doc-brief ellipsis'}>
										<span className={'name'}>{doc.name}</span>
										<span className={'subject'}>{doc.department}</span>
										<span className={'level'}>{doc.with_title}</span>
										<span className={'hospital'}>{doc.affiliated_hospital}</span>

										<p className={'ellipsis'}>
											李医生，我最近嗓子疼，有什么办法解决吗？sadsadsadasdsadsadsadas
										</p>
									</div>
								</div>
							}
						>
							<div className='btn-group'>
								<Button>拒绝推送</Button>
								<Button>删除</Button>
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
)(DoctorChatLIst);
