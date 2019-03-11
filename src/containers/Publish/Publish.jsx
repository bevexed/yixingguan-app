import React, {Component} from 'react';
import {connect} from 'react-redux';

import './publish.less'
import {Icon, NavBar, WhiteSpace, ImagePicker, WingBlank, TextareaItem, List, Modal} from "antd-mobile";

import {updataPubliceArticle, updataPubliceArticleImg, pubulish, havePubulished} from "../../redux/publish/action";

const Item = List.Item;

class Publish extends Component {

	onChange = (files, type, index) => {
		this.props.updataPubliceArticleImg({img: files})
	};

	onTextChange = idea => {
		this.props.updataPubliceArticle({content: idea})
	};

	render() {
		const {article_content, article_img, whoCanSee} = this.props;
		const {is_open, allow_users} = whoCanSee;
		const labels = allow_users.map(sort => sort.label);
		const picture = article_img.img.map(img => img.url);

		return (
			<div className='publish'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => Modal.alert('', '退出后将删除已编辑的文本???', [
						{
							text: '退出', onPress: () => {
								this.props.havePubulished();
								this.props.history.goBack()
							}
						},
						{text: '不退出', onPress: () => console.log(1)},
					])}
				>编辑图文</NavBar>
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
							// onImageClick={(index, fs) => console.log(index, fs)}
							selectable={article_img.img.length < 9}
							// multiple={true}
						/>
					</WingBlank>

					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>

					<Item
						thumb={<img src={require('./img/我的 (1).svg')} alt=""/>}
						extra={is_open === 1 ? '全部' : [...labels].join('、')}
						arrow={'horizontal'}
						onClick={() => this.props.history.push('/publish-select-sort')}
					>
						谁可以看
					</Item>
				</List>

				<div className={'foot'}>
					<div
						className={'button preview'}
						onClick={() => this.props.history.push('/publish-preview')}
					>预览
					</div>
					<div
						className={'button pb'}
						onClick={() => this.props.pubulish({contents: article_content.content, picture, is_open, allow_users,}, this.props.history)}
					>直接发表
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		article_content: state.article_content,
		article_img: state.article_img,
		whoCanSee: state.whoCanSee
	};
}

export default connect(
	mapStateToProps,
	{
		updataPubliceArticle,
		updataPubliceArticleImg,
		pubulish,
		havePubulished
	}
)(Publish);
