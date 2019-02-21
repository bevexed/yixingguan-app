import React, {PureComponent} from 'react';
// import {connect} from 'react-redux';
import './header.less'
import PropTypes from 'prop-types';
// import {withRouter} from 'react-router-dom'

class HeaderMain extends PureComponent {
	static propTypes = {
		title: PropTypes.string.isRequired,
		isAdd:PropTypes.bool.isRequired
	}
	render() {
		let span = null;
		if(this.props.isAdd){
			span = <span className='iconfont icon-add addIcon'></span>
		}
		return (
			<div className='headerDiv'>
				<img src={require('./img/fanhui@2x.png')} alt=''/>
				<span>{this.props.title}</span>
				{span}
			</div>
		);
	}
}

// function mapStateToProps(state) {
// 	return {};
// }

export default HeaderMain;
