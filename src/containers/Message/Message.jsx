import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, Icon, WhiteSpace, InputItem} from "antd-mobile";

import './Message.less';

class Message extends Component {
	state = {
		inputType: 'input',
		input: '',
		menuShow: false
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
		window.scrollTo(0,document.body.scrollHeight);
		this.setState({
			menuShow:false
		})
	};

	render() {
		const {inputType, menuShow} = this.state;

		return (
			<div className={'message'}>
				<NavBar
					mode="light"
					icon={<Icon type="left" color={'#000'} size={'md'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>{this.props.match.params.to}</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<div style={{height: 1000}}>12</div>

				<div className={'tip'}
						 onClick={() => window.scrollTo(0, document.body.scrollHeight / 100)}
				>
					123
				</div>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<div>
					<div className={'tip'}
					>
						123
					</div>

					<div className={'speak-input-wrap'}>
						<div className={'voice'}>

							<img
								src={require('./img/jianpan-@3x.png')}
								onClick={() => this.changeInputType(inputType)}
								alt=""/>
							{
								inputType === 'input' ? <div style={{width: '70%'}}>
										<InputItem
											placeholder={'请输入...'}
											onChange={val => this.handleChange('input', val)}
											onFocus={this.showKeyboard}
											onBlur={this.showKeyboard}
										/>
									</div> :
									< div className={'speak'}>
										按住说话
									</div>
							}
							<img src={require('./img/biaoqing@3x.png')} alt=""/>
							<img src={require('./img/tianjia-3@3x.png')}
									 onClick={() => this.setState({menuShow: !menuShow})}
									 alt=""/>
						</div>

						<div className={'alert'} style={{height: menuShow ? 110 : 0}}>
							<img src={require('./img/拍照@3x.png')} alt=""/>
							<img src={require('./img/相册@3x.png')} alt=""/>
						</div>


					</div>
				</div>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Message);
