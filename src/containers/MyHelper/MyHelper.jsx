import React, {Component} from 'react';
import {connect} from 'react-redux';

import './MyHelper.less'
import {Icon, NavBar, WhiteSpace} from "antd-mobile";

class myHelper extends Component {
	state={
		code_show:false
	};

	render() {
		const {code_show}=this.state;
		const arr = [0, 1, 2];

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
					{arr.map((index) => {
						return (
							<div key={index}>
								<div>
									<img alt='' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551407674&di=ec267c3e88e04ffe96d351b62c7a38a7&imgtype=jpg&er=1&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F170914%2F0220055L1-9.jpg'/>
									<span>x</span>
								</div>
								<p>朱小鱼</p>
							</div>
						)
					})}
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
