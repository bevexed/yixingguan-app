import React, {PureComponent} from 'react';
import {ActivityIndicator} from "antd-mobile";
import './LoadingMore.less';
import PropTypes from 'prop-types';

class LoadingMore extends PureComponent {

	static propTypes = {
		callback: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired
	};

	componentDidMount() {
		const {callback, loading} = this.props;
		window.onscroll = function () {
			if (loading) {
				return
			}
			const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
			if (scrollTop + clientHeight + 60 > scrollHeight) {
				callback()
			}
		}
	}

	render() {
		const {loading} = this.props;
		return (
			<div className='loading-more'>
				<ActivityIndicator
					color={'#68e3ce'}
					animating={loading}
				/>
			</div>
		)
	}
}

export default LoadingMore;


