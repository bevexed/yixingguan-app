import React, {PureComponent} from 'react';

import {Toast} from "antd-mobile";

class NotFound extends PureComponent {
	state = {
		button_show: false
	};

	componentDidMount() {
		Toast.loading('数据加载中...', 3000, () => {
			this.setState({button_show: true})
		}, true);

		sessionStorage.removeItem('path');
	}

	render() {
		const {button_show} = this.state;
		// this.props.history.replace('/');
		return (
			<div>
				{button_show ?
					<div
						className={'button'}
						onClick={() => this.props.history.replace('/')}>回到首页
					</div> : null
				}
			</div>
		);
	}
}


export default NotFound;
