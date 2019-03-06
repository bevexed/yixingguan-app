import React, {PureComponent} from 'react';

class NotFound extends PureComponent {
	render() {
		sessionStorage.removeItem('path');
		return (
			<div>
				<div
					className={'button'}
					onClick={()=>this.props.history.replace('/')}>回到首页
				</div>
			</div>
		);
	}
}


export default NotFound;
