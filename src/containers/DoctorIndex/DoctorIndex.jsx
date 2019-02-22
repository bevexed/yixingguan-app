import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Result, Icon, WhiteSpace} from 'antd-mobile';

class DoctorIndex extends Component {
	render() {
		const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt=""/>;
		return (
			<div className="result-example">
				<Result
					img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
					title="支付成功"
					message={<div>998.00元 <del>1098元</del></div>}
				/>
				<WhiteSpace/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(DoctorIndex);
