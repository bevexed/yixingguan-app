import React, {Component} from 'react';

import './NotFound.less'

class NotFound extends Component {
	state = {
		button_show: true
	};

	componentDidMount() {
		sessionStorage.clear();
	}

	render() {
		// const {button_show} = this.state;

		return (
			<div className='not-found'>
				{/*<p>*/}
				{/*	404 <br/>*/}
				{/*	网页走丢了*/}
				{/*</p>*/}
				{/*{button_show ?*/}
				{/*	<div*/}
				{/*		className='button'*/}
				{/*		onClick={() => this.props.history.replace('/')}>回到首页*/}
				{/*	</div> : null*/}
				{/*}*/}
			</div>
		);
	}
}


export default NotFound;
