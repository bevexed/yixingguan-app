import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {Result} from "antd-mobile";

import {reqArticleBrief, reqLogo} from "../../../api";

import './Author.less'

class Author extends Component {
	state = {
		content: '',
		src: ''
	};

	static propTypes = {
		Author: PropTypes.func.isRequired
	};

	componentDidMount() {
		reqArticleBrief()
			.then(res => {
				if (res.code === 1) {
					this.setState({content: res.data.content})
				}
			});

		reqLogo()
			.then(res => {
				if (res.code === 1) {
					this.setState({src: res.data})
				}
			})
	}

	render() {
		const {content, src} = this.state;
		return (
			<div className='author'>
				<Result
					img={<img src={src} alt=""/>}
					title={<div
						className={'button'}
						onClick={() => this.props.Author()}
					>登录/注册</div>}
				/>

				<div className={'wrap'}>
					<p className='content' dangerouslySetInnerHTML={{__html: content}}>
						{/*{content}*/}
					</p>
				</div>
			</div>
		);
	}
}

export default Author;

