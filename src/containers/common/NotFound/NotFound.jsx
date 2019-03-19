import React, {Component} from 'react';

import './NotFound.less'
import Cookie from 'js-cookie';

class NotFound extends Component {
	state = {
		button_show: true
	};

	componentDidMount() {
		sessionStorage.clear();
		Cookie.remove();
		localStorage.clear();
	}

	render() {
		const {button_show} = this.state;
		// this.props.history.replace('/');
		return (
			<div className='not-found'>
				<p>
					404 <br/>
					网页走丢了
				</p>
				{button_show ?
					<div
						className='button'
						onClick={() => this.props.history.replace('/')}>回到首页
					</div> : null
				}
			</div>
		);
	}
}


export default NotFound;
