import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, ImagePicker, List, Modal, NavBar, TextareaItem, Toast, WhiteSpace, WingBlank} from "antd-mobile";
import './PublishPreview.less'
import {reqReleaseShare} from "../../api/doctor";

const Item = List.Item;

class PublishPreview extends Component {
	pubulish = pub => {
		const {contents, picture, is_open, allow_users} = pub;
		const key = is_open === 1 ? {contents, picture, is_open} : {contents, picture, is_open, allow_users};


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
			<div className='publish-preview'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
					rightContent={<div
						className={'button'}
						onClick={() => this.pubulish({contents: article_content.content, picture, is_open, allow_users})}
					>发布</div>}
				>预览</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List>
					<WingBlank>
						<TextareaItem
							placeholder={'想说些什么'}
							autoHeight
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
							selectable={false}
							// multiple={true}
						/>
					</WingBlank>

					<WhiteSpace/>
					<WhiteSpace/>
					<WhiteSpace/>


					<Item
						thumb={<img src={require('./img/我的 (1).svg')} alt=""/>}
						extra={is_open === 1 ? <span className='sort'>全部可看</span> : null}
					>
						谁可以看
					</Item>

					{is_open !== 1 ?
						allow_users.map((sort, index) =>
							<Item
								key={index}
							>
								<span className='sort'>{sort.label}：{sort.names.join('、')}</span>
							</Item>
						) : null
					}


				</List>

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
)(PublishPreview);
