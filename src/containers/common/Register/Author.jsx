import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import PropTypes from 'prop-types';
import {Checkbox, Result, Toast} from "antd-mobile";

import {reqArticleBrief, reqLogo} from "../../../api";

import './Author.less'

class Author extends Component {
	state = {
		content: '',
		src: '',
		checked: false
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
		const {content, src, checked} = this.state;
		return (
			<div className='author'>
				<Result
					img={<img src={src} alt=""/>}
					title={<div
						className={'button'}
						onClick={() => {
							if (!checked) {
								Toast.fail('请先阅读《软件许可及服务协议》');
								return
							}
							this.props.Author()
						}}
					>登录/注册</div>}
				/>

				<div className='detail'>
					<Checkbox
						className="my-radio"
						checked={checked}
						onChange={e => {
							this.setState({checked: e.target.checked})
						}}
					>
						&nbsp;我已阅读并同意
						<span onClick={e => {
							e.cancelBubble = true;
							this.props.history.push('/DOC/reqSoftwareLicense')
						}}
						>《软件许可及服务协议》</span>
					</Checkbox>
				</div>

				<div className={'wrap'}>
					<p className='content' dangerouslySetInnerHTML={{__html: content}}>
						{/*{content}*/}
					</p>
				</div>

			</div>
		);
	}
}

export default withRouter(Author);


