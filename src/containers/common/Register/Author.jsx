import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {Result} from "antd-mobile";

import {reqArticleBrief} from "../../../api";

import './Author.less'

class Author extends Component {
	state = {
		content: ''
	};

	componentDidMount() {
		reqArticleBrief()
			.then(res => {
				if (res.code === 1) {
					this.setState({content: res.data.content})
				}
			})
	}

	render() {
		const {content} = this.state;
		return (
			<div className='author'>
				<Result
					img={<img src={require('./img/biaoqing@3x.png')} alt=""/>}
					title={<div
						className={'button'}
						onClick={() => this.props.Author()}
					>登录/注册</div>}
				/>

				<div className={'wrap'}>
					<p className={'content'}>
						{content}
					</p>
				</div>
			</div>
		);
	}
}

Author.propTypes = {
	Author: PropTypes.func.isRequired
};

export default Author;

