import React, {Component} from 'react';
import './Published.less'
import {NavBar, Icon, WhiteSpace, WingBlank} from "antd-mobile";
import LoadingMore from '../../../components/LoadIngMore/LoadingMore'
import {reqShareLists} from "../../../api/doctor";

class Published extends Component {

	state = {
		total: 100,
		articles: [],
		page: 1,
	};

	componentDidMount() {
		this.loadingMore()
	}

	// todo：分页
	loading = false;
	loadingMore = () => {
		const {page, total, articles} = this.state;
		if ((page - 1) * 10 >= total) {
			return
		}
		this.loading = true;
		reqShareLists(page)
			.then(
				res => {
					if (res.code === 1) {
						this.loading = false;
						this.setState(
							{
								articles: {...articles, ...res.data.data},
								page: res.data.current_page + 1,
								total: res.data.total
							}
						)
					}
				}
			)
	};

	render() {
		const {articles} = this.state;

		return (
			<div className='published'>
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
							onClick={() => this.props.history.push('/publish')}
						/>}
				>
					发布图文
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<div className='hr'/>
				<WingBlank>
					{Object.entries(articles).map(([time, articles]) =>
						<div key={time} className='day'>
							<div className='time'>
								<span className='date'>{isNaN(parseInt(time.split('-')[1])) ? time.split('-')[0] : parseInt(time.split('-')[1])}</span>
								<span className='month'>{isNaN(parseInt(time.split('-')[0])) ? null : parseInt(time.split('-')[0]) + '月'}</span>
							</div>
							<div className='articles'>
								{articles.map(article =>
									<div key={article.id} className='article' onClick={() => this.props.history.push('/publish-detail/' + article.id)}>
										<div className='img' style={{display: article.picture ? 'block' : 'none'}}><img src={article.picture} alt=""/></div>
										<div className='content'>{article.content}</div>
									</div>)
								}
							</div>
						</div>)
					}
				</WingBlank>

				<LoadingMore callback={this.loadingMore} loading={this.loading}/>
			</div>
		);
	}
}

export default Published
