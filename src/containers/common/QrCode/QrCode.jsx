import React, {Component} from 'react';
import {connect} from 'react-redux';
import Qrcode from "qrcode.react";
import './QrCode.less'

class QrCode extends Component {
	state = {
		shareUrl: '',
		shareContent: ''
	};

	componentDidMount() {
		const state = this.props.match.params.state;
		let shareUrl = state.split(',')[1];
		let shareContent = decodeURIComponent(state.split(',')[0]);
		console.log(state);
		console.log(shareContent, decodeURIComponent(shareUrl));
		this.setState({shareContent, shareUrl})
		// if (!localStorage.shareUrl) {
		// 	window.location.href = window.location.origin;
		// }
	}

	render() {
		const {shareContent, shareUrl} = this.state;
		return (
			<div
				className='qrcode-react'
			>
				<div className='qrcode-padding'>
					<p className='share-content'>{shareContent}</p>
					<p className='content'>点击右上角按钮即可分享</p>
					<p className='content'>扫描关注</p>
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

