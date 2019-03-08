import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, Modal, NavBar} from "antd-mobile";
import './PublishPreview.less'

class PublishPreview extends Component {
	render() {
		return (
			<div className='publish-preview'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => Modal.alert('', '此次编辑是否保留???', [
						{text: '不保留', onPress: () => this.props.history.goBack()},
						{text: '保留', onPress: () => this.onSureSelect()},
					])}
					rightContent={<div
						className={'button'}
						onClick={() => this.onSureSelect()}
					>完成</div>}
				>预览</NavBar>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(PublishPreview);
