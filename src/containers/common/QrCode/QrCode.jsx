import React, {Component} from 'react';
import {connect} from 'react-redux';
import Qrcode from "qrcode.react";
import './QrCode.less'

class MyComponent extends Component {
	componentDidMount() {
		if (!localStorage.shareUrl) {
			window.location.href = window.location.origin;
		}
	}

	render() {
		return (
			<div
				className='qrcode-react'
			>
				<div className='qrcode-padding'>
					<p className='share-content'>{localStorage.shareContent}</p>
					<p className='content'>点击右上角按钮即可分享</p>
					<p className='content'>扫描关注</p>
					{localStorage.shareUrl &&
					<Qrcode
						value={localStorage.shareUrl}
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
)(MyComponent);

