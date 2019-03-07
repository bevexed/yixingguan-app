import React, {Component} from 'react';
import {connect} from 'react-redux';

import './publish.less'
import {Icon, NavBar, WhiteSpace, ImagePicker, WingBlank, TextareaItem, List} from "antd-mobile";

import {updataPubliceArticle, updataPubliceArticleImg} from "../../redux/publish/action";

const Item = List.Item;

class Publish extends Component {

	onChange = (files, type, index) => {
		console.log(files, type, index);
		this.props.updataPubliceArticleImg({img: files})
	};

	onTextChange = idea => {
		this.props.updataPubliceArticle({content: idea})
	};

	render() {
		const {article_content, article_img} = this.props;

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
							rows={6}
							onChange={idea => this.onTextChange(idea)}
							defaultValue={article_content.content}
						/>
					</WingBlank>

					<WingBlank>
						<ImagePicker
							files={article_img.img}
							onChange={this.onChange}
							length={3}
							onImageClick={(index, fs) => console.log(index, fs)}
							selectable={article_img.img.length < 9}
							// multiple={true}
						/>
					</WingBlank>

					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>

					<Item
						thumb={<img src={require('./img/我的 (1).svg')} alt=""/>}
						extra={'123'}
						arrow={'horizontal'}
						onClick={() => this.props.history.push('/publish-select-sort')}
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
	return {
		article_content: state.article_content,
		article_img: state.article_img
	};
}

export default connect(
	mapStateToProps,
	{
		updataPubliceArticle,
		updataPubliceArticleImg
	}
)(Publish);
