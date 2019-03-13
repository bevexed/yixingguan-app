import React, {PureComponent} from 'react';
import {ActivityIndicator} from "antd-mobile";
import './LoadingMore.less';
import PropTypes from 'prop-types';

class LoadingMore extends PureComponent {

	static propTypes = {
		page: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired,
		callback: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired
	};

	componentDidMount() {
		const that = this;
		window.onscroll = () => {
			const {callback, loading, page, total} = that.props;
			if ((page - 1) * 10 >= total) {
				return
			}
			if (loading) {
				return
			}
			const {scrollTop, scrollHeight, clientHeight} = document.body;
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


