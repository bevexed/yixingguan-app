import React, {Component} from 'react';
import {connect} from 'react-redux';

import './MyHelper.less'
import {Icon, NavBar, WhiteSpace} from "antd-mobile";

import {reqAssistantList} from "../../api/doctor";
import Cookie from 'js-cookie';

const token = Cookie.get('token');

class myHelper extends Component {
	state = {
		code_show: false,
		assistantList: []
	};

	componentDidMount() {
		if (token) {
			reqAssistantList(token)
				.then(
					res => {
						if (res.code === 1) {
							this.setState({assistantList: res.data})
						}
					}
				)
		}
	}

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
									<span><img src={require('./img/cw@3x.png.png')} alt=""/></span>
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
						className='code'
						onClick={() => this.setState({code_show: false})}
					>
						<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=977147320,1756285936&fm=26&gp=0.jpg" alt=""/>
					</div> : null
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(myHelper);
