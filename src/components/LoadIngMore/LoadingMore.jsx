import React, {PureComponent} from 'react';
import {ActivityIndicator} from "antd-mobile";
import './LoadingMore.less';
import PropTypes from 'prop-types';
import {debounce} from "../../utils";

class LoadingMore extends PureComponent {
	state = {
		loading: false
	};

	static propTypes = {
		page: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired,
		callback: PropTypes.func.isRequired,
	};

	componentDidMount() {
		const that = this;
		window.onscroll = debounce(() => {
			this.setState({loading: true});
			const {callback, page, total} = that.props;
			if ((page - 1) * 10 >= total) {
				this.setState({loading: false});
				return
			}
			const {scrollTop, scrollHeight, clientHeight} = document.body || document.documentElement;
			if (scrollTop + clientHeight + 60 > scrollHeight) {
				callback()
			}
		}, 200)
	}

	componentWillUnmount() {
		this.setState = () => null;
	}

	render() {
		const {loading} = this.state;
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


