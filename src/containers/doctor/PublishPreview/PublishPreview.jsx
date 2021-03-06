import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, List, NavBar, WhiteSpace, WingBlank} from "antd-mobile";
import './PublishPreview.less'
import {pubulish, updataPubliceArticleImg, updataPubliceArticle} from "../../../redux/publish/action";

const Item = List.Item;

class PublishPreview extends Component {

	onChange = (files) => {
		this.props.updataPubliceArticleImg({img: files})
	};

	render() {
		const {article_content, article_img, whoCanSee} = this.props;
		const {is_open, allow_users} = whoCanSee;
		const picture = article_img.img.map(img => img.url);

		return (
			<div className='publish-preview'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
					rightContent={<div
						className='button'
						onClick={() => this.props.pubulish({contents: article_content.content, picture, is_open, allow_users},this.props.history)}
					>发布</div>}
				>预览</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List>
					<WingBlank>
						<div className='content'>
							{article_content.content}
						</div>
					</WingBlank>

					<WingBlank>
						<div className='img'>
							{picture.map((item, index) => <img src={item} key={index} alt=""/>)}
						</div>
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
	{
		pubulish,
		updataPubliceArticleImg,
		updataPubliceArticle
	}
)(PublishPreview);
