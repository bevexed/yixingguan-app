import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, WhiteSpace} from "antd-mobile";

import './Avatar.less'

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {receiveUser} from "../../../redux/user/action";

class Avatar extends Component {
	state = {
		crop: {
			aspect: 1,
			width: 50,
			x: 0,
			y: 0,
		},
		pixelCrop: '',
		src: null
	};

	selectAvatar = avatar => {
		if (avatar.length) {
			this.props.receiveUser({avatar, selectAvatar: avatar});
		}
		this.props.history.replace('/doctor-complete-information')
	};

	onChange = (crop, pixelCrop) => {
		this.setState({crop, pixelCrop});
	};

	onSelectFile = e => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () =>
				this.setState({src: reader.result}),
			);
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	onImageLoaded = (image, pixelCrop) => {
		this.imageRef = image;
	};

	onCropComplete = (crop, pixelCrop) => {
		this.makeClientCrop(crop, pixelCrop);
	};

	onCropChange = crop => this.setState({crop});

	async makeClientCrop(crop, pixelCrop) {
		if (this.imageRef && crop.width && crop.height) {
			const croppedImageUrl = await Avatar.getCroppedImg(
				this.imageRef,
				pixelCrop,
				'newFile.jpeg',
			);
			this.setState({croppedImageUrl});
		}
	}

	static getCroppedImg(image, pixelCrop) {
		const canvas = document.createElement('canvas');
		canvas.width = pixelCrop.width;
		canvas.height = pixelCrop.height;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width,
			pixelCrop.height,
			0,
			0,
			pixelCrop.width,
			pixelCrop.height
		);

		// As Base64 string
		return canvas.toDataURL('image/jpeg');
	}


	render() {
		const {crop, croppedImageUrl, src} = this.state;

		return (
			<div className='doctor-avatar'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>选择头像</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>


				<div className="center">
					{!src && <div className='avatar' onClick={() => document.querySelector('#avatar').click()}>请选择头像</div>}
					<input type="file" hidden id='avatar' capture={false} onChange={this.onSelectFile}/>
				</div>

				<div className='center'>
					{src && (
						<ReactCrop
							src={src}
							crop={crop}
							onImageLoaded={this.onImageLoaded}
							onComplete={this.onCropComplete}
							onChange={this.onCropChange}
						/>
					)}
				</div>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<div
					className={'button'}
					onClick={() => this.selectAvatar(croppedImageUrl)}
				>确认
				</div>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
	{
		receiveUser
	}
)(Avatar);
