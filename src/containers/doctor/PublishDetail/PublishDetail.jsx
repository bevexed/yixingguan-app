import React, {Component} from 'react';
import {Icon, List, NavBar, WhiteSpace, WingBlank} from "antd-mobile";
import './PublishDetail.less'
import {reqShareDetail} from "../../../api/doctor";

const Item = List.Item;

class PublishDetail extends Component {
	state = {
		article: {
			content: '',
			create_at: '',
			is_open: 1,
			label: [],
			picture: []
		}
	};

	componentDidMount() {
		const id = this.props.match.params.article_id;
		reqShareDetail(id)
			.then(
				res => {
					if (res.code === 1) {
						this.setState({article: res.data})
					}
				}
			)
	}

	render() {
		const {label, is_open, content, picture, create_at} = this.state.article;

		return (
			<div className='publish-detail'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>文章详情</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List>
					<WhiteSpace/>
					<WhiteSpace/>

					<WingBlank>
						<time>
							{create_at}
						</time>
					</WingBlank>

					<WingBlank>
						<div className='content'>
							{content}
						</div>
					</WingBlank>

					<WingBlank>
						<div className='img'>
							{picture.map(item =>
								<img src={item} alt=""/>)
							}
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
						label.map((sort, index) =>
							<Item
								key={index}
							>
								<span className='sort'>{sort.label}：{sort.user_names}</span>
							</Item>
						) : null
					}


				</List>

			</div>
		);
	}
}

export default PublishDetail;
