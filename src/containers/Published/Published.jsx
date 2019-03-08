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
		reqShareLists()
			.then(
				res => {
					if (res.code === 1) {
						this.setState({articles: res.data.data})
					}
				}
			)
	}

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
				<WhiteSpace/>
				<WhiteSpace/>

				{/*todo:发布图文接口*/}
				<WingBlank>
					{articles.map(article =>
						<div key={article.id} className='day'>
							<div className='time'><span>{article.create_at}</span></div>
							<div className='article'>
								<div className='img'><img src={article.picture?require('../../asset/img/panel.png'):''} alt=""/></div>
								<div className='content'>{article.content}</div>
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
