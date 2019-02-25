import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, Icon, WhiteSpace, List, InputItem} from "antd-mobile";

import './Message.less'

const Item = List.Item;

class Message extends Component {
	state = {
		inputType: 'input',
		input: '',
		show: false
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

	render() {
		const {inputType, show} = this.state;


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


				<div>
					<div className={'tip'}>

					</div>

					<div className={'speak-input-wrap'}>
						<div className={'voice'}>

							<img
								src={require('./img/jianpan-@3x.png')}
								onClick={() => this.changeInputType(inputType)}
								alt=""/>
							{
								inputType === 'input' ? <div>
										<InputItem
											placeholder={'请输入...'}
											onChange={val => this.handleChange('input', val)}
										/>
									</div> :
									< div className={'speak'}>
										按住说话
									</div>
							}
							<img src={require('./img/biaoqing@3x.png')} alt=""/>
							<img src={require('./img/tianjia-3@3x.png')}
									 onClick={() => this.setState({show: !show})}
									 alt=""/>
						</div>

						<div className={'alert'} style={{height: show ? 200 : 0}}>

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
