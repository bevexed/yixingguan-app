import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Published.less'
import {NavBar, Icon, WhiteSpace, WingBlank} from "antd-mobile";

import {reqShareLists} from "../../api/doctor";

class Published extends Component {

	state = {
		articles: []
	};

	componentDidMount() {
		reqShareLists(1)
			.then(
				res => {
					if (res.code === 1) {
						this.setState({articles: res.data.data})
					}
				}
			)
	}

	// todo：分页

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

				{/*todo:发布图文接口*/}
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
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Published);
