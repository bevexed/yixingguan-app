import React, {Component} from 'react';
import {connect} from 'react-redux';

import './publish.less'
import {Icon, NavBar, WhiteSpace, ImagePicker, WingBlank, TextareaItem, List, Modal, Toast} from "antd-mobile";

import {updataPubliceArticle, updataPubliceArticleImg} from "../../redux/publish/action";
import {reqReleaseShare} from "../../api/doctor";

const Item = List.Item;

class Publish extends Component {

	onChange = (files, type, index) => {
		this.props.updataPubliceArticleImg({img: files})
	};

	onTextChange = idea => {
		this.props.updataPubliceArticle({content: idea})
	};

	pubulish = pub => {
		const {contents, picture, is_open, allow_users} = pub;
		const key = {contents, picture, is_open, allow_users};

		// if (!contents) {
		// 	Toast.fail('暂无可发送的内容',1)
		// }

		reqReleaseShare(key)
			.then(res => {
				if (res.code === 1) {
					Toast.success('文章发布成功', 1,)
				} else {
					Toast.fail(res.message, 1)
				}
			})
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
						{text: '退出', onPress: () => this.props.history.goBack()},
						{text: '不退出', onPress: () => console.log(1)},
					])}
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
						onClick={()=>this.props.history.push('/publish-preview')}
					>预览
					</div>
					<div
						className={'button pb'}
						onClick={() => this.pubulish({contents: article_content.content, picture, is_open, allow_users})}
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
		updataPubliceArticleImg
	}
)(Publish);
