import React, {Component} from 'react';
import {connect} from 'react-redux';
import './header.less'
class HeaderMain extends Component {
	render() {
		return (
			<div className='headerDiv'>
				<img src={require('./img/fanhui@2x.png')} alt=''/>
				<span>预约受理记录</span>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(HeaderMain);
