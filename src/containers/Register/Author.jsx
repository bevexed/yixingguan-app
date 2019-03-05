import React, {Component} from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {Result} from "antd-mobile";

import './Author.less'

class Author extends Component {
	render() {
		const {isAthor} = this.props;

		return (
			<div className='author'>
				<Result
					img={<img src={require('./img/biaoqing@3x.png')} alt=""/>}
					title={<div
						className={'button'}
						onClick={()=>this.props.Author()}
					>登录/注册</div>}
				/>

				<div className={'wrap'}>
					<p className={'content'}>
						欣赏善良和懂得感恩的人 感恩是一种善行，古语说的好，滴水之恩，涌泉相报。我们作为行走在现世中的人，要时刻怀揣感恩之心。感恩是一种生活态度，是一种品德，更是一种人生的大智慧，一个人只有心怀感恩，才会懂得珍惜，懂得尊重，懂得付出，珍惜身边的人或认真对修养
						欣赏善良和懂得感恩的人 感恩是一种善行，古语说的好，滴水之恩，涌泉相报。我们作为行走在现世中的人，要时刻怀揣感恩之心。感恩是一种生活态度，是一种品德，更是一种人生的大智慧，一个人只有心怀感恩，才会懂得珍惜，懂得尊重，懂得付出，珍惜身边的人或认真对修养
						欣赏善良和懂得感恩的人 感恩是一种善行，古语说的好，滴水之恩，涌泉相报。我们作为行走在现世中的人，要时刻怀揣感恩之心。感恩是一种生活态度，是一种品德，更是一种人生的大智慧，一个人只有心怀感恩，才会懂得珍惜，懂得尊重，懂得付出，珍惜身边的人或认真对修养
						欣赏善良和懂得感恩的人 感恩是一种善行，古语说的好，滴水之恩，涌泉相报。我们作为行走在现世中的人，要时刻怀揣感恩之心。感恩是一种生活态度，是一种品德，更是一种人生的大智慧，一个人只有心怀感恩，才会懂得珍惜，懂得尊重，懂得付出，珍惜身边的人或认真对修养
						欣赏善良和懂得感恩的人 感恩是一种善行，古语说的好，滴水之恩，涌泉相报。我们作为行走在现世中的人，要时刻怀揣感恩之心。感恩是一种生活态度，是一种品德，更是一种人生的大智慧，一个人只有心怀感恩，才会懂得珍惜，懂得尊重，懂得付出，珍惜身边的人或认真对修养
					</p>
				</div>
			</div>
		);
	}
}

Author.propTypes = {
	isAuthor: PropTypes.bool.isRequired,
	Author:PropTypes.func.isRequired
}
;

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Author);

