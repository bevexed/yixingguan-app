import React, {Component} from 'react';
import {connect} from 'react-redux';
import Qrcode from "qrcode.react";
import './QrCode.less'
import {getWxConfig, wxShare} from "../../../wx-jssdk";
import {Toast} from "antd-mobile";

class QrCode extends Component {
	state = {
		shareUrl: '',
		shareContent: ''
	};

	componentDidMount() {
		const state = this.props.match.params.state;
		let shareUrl = decodeURIComponent(state.split(',')[1]);
		let shareContent = decodeURIComponent(state.split(',')[0]);
		console.log(state);
		console.log(shareContent, decodeURIComponent(shareUrl));
		this.setState({shareContent, shareUrl});
		getWxConfig();
		setTimeout(() => wxShare({
			title: '星医馆',
			desc: shareContent,
			link: window.location.origin + window.location.hash,
			imgUrl: 'http://wx.qlogo.cn/mmhead/Q3auHgzwzM6HpLT67laJhmicbeh2cvMKDErk1w7Rqrp4zjPRnnlh4Ww/0',
			type: ''
		}), 200);
	}

	doShare = (shareUrl) => {
		if (sessionStorage.identity === 'doctor') {
			Toast.fail('医生不能邀请自己哦！', 3);
			return
		}
		window.location.href = shareUrl
	};

	render() {
		const {shareContent, shareUrl} = this.state;
		return (
			<div
				className='qrcode-react'
			>
				<div className='qrcode-padding'>
					<p className='share-content'>{shareContent}</p>
					<p className='content'>点击右上角按钮即可分享</p>
					<p className='content'>扫描或<a onClick={() => this.doShare(shareUrl)}>点击</a>关注</p>
					{shareUrl &&
					<Qrcode
						value={shareUrl}
						renderAs='svg'
						size={200}
						bgColor='#FFFFFF'
						fgColor={'#162c25'}
						level='H'
					/>
					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(QrCode);

