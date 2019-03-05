import React, {Component} from 'react';
import {connect} from 'react-redux';

import './publish.less'
import {Icon, NavBar, WhiteSpace, ImagePicker, WingBlank, TextareaItem, List} from "antd-mobile";

const Item = List.Item;

class Publish extends Component {
	state = {
		files: [],
		idea: ''
	};

	onChange = (files, type, index) => {
		console.log(files, type, index);
		this.setState({
			files,
		});
	};

	render() {
		const {files} = this.state;

		return (
			<div className='publish'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>发布图文</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List>
					<WingBlank>
						<TextareaItem
							placeholder={'想说些什么'}
							rows={4}
							onChange={idea => this.setState({idea})}
						/>
					</WingBlank>

					<WingBlank>
						<ImagePicker
							files={files}
							onChange={this.onChange}
							length={3}
							onImageClick={(index, fs) => console.log(index, fs)}
							selectable={files.length < 9}
							// multiple={true}
						/>
					</WingBlank>

					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>

					<Item
						extra={'123'}
						arrow={'horizontal'}
					>
						谁可以看
					</Item>
				</List>

				<div className={'foot'}>
					<div className={'button preview'}>预览</div>
					<div className={'button pb'}>直接发表</div>
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
)(Publish);
