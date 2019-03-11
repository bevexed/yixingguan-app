import React, {Component} from 'react';

class NotFound extends Component {
	state = {
		button_show: true
	};

	componentWillMount() {

		sessionStorage.removeItem('path');
	}

	render() {
		const {button_show} = this.state;
		// this.props.history.replace('/');
		return (
			<div
				style={{width: '100VW', height: '100VH'}}>
				{button_show ?
					<div
						className={'button'}
						onClick={() => this.props.history.replace('/')}>回到首页
					</div> :
					<div>
						loading
					</div>
				}
			</div>
		);
	}
}


export default NotFound;
