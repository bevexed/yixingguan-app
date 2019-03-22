import React, {Component} from 'react';

import './MyHelper.less'
import {Icon, NavBar, Toast, WhiteSpace} from "antd-mobile";

import {reqAssistantList, reqAssistantDelete} from "../../../api/doctor";

import Qrcode from "qrcode.react";


class MyHelper extends Component {
	state = {
		code_show: false,
		assistantList: []
	};

	componentDidMount() {
		this.getAssistantList()
	}

	getAssistantList = () => {
		reqAssistantList()
			.then(
				res => {
					if (res.code === 1) {
						this.setState({assistantList: res.data})
					}
				}
			)
	};

	deleteAssistant = id => {
		reqAssistantDelete(id)
			.then(
				res => {
					if (res.code === 1) {
						Toast.success(res.message);
						this.getAssistantList();
					} else {
						Toast.success(res.message);
					}
				}
			)
	};

	render() {
		const {code_show, assistantList} = this.state;

		return (
			<div className={'my-help'}>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
					rightContent={
						<Icon
							type={'cross'}
							size={'md'}
							color={'#000'}
							style={{transform: 'rotate(45deg)'}}
							onClick={() => this.setState({code_show: true})}
						/>}
				>
					我的助手
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<div className='helpBox'>
					{
						assistantList.map(assistant =>
							<div key={assistant.name}>
								<div>
									<img alt='' src={assistant.avatar}/>
									<span><img src={require('./img/cw@3x.png.png')} alt="" onClick={() => this.deleteAssistant(assistant.id)}/></span>
								</div>
								<p>{assistant.name}</p>
							</div>
						)
					}
				</div>

				<div className='helpWarn'>
					<p>我的助手：</p>
					<span>我的助手可以在您不同微信上对患者进行解答 您的学员可扫描二维码添加，为患者提供建议性解答</span>
				</div>


				{code_show ?
					<div
						className='qrcode-react'
						onClick={() => this.setState({code_show: false})}
					>
						<Qrcode
							value={'sadasdasdasdsadassa'}
							renderAs='svg'
							size={200}
							bgColor='#FFFFFF'
							fgColor='#68e3c3'
							level='H'
						/>
					</div> : null
				}
			</div>
		);
	}
}

export default MyHelper;
