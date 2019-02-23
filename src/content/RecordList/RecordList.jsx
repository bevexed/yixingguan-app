import React, {Component} from 'react';
import {connect} from 'react-redux';
import './RecordList.less'


class RecordList extends Component {
    render() {
        return (
            <div className='recordList'>
							<p className='recordP'>进行中</p>
							<div className='recordDiv'>
								<div>
									<div>
										<img className='appointAvatar' alt='' src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3003067246,3954665585&fm=27&gp=0.jpg'/>
										<div className='appointInfo'>
											<div>
												<p className='appointName'>李峰</p>
												<span className='appointSpan'>呼吸内科</span>
												<span>主治医师</span>
											</div>
											<div>
												<p className='appointGrade'>三级甲等</p>
												<span>浙江省立同德医院</span>
											</div>
										</div>

									</div>
									<span>2019-02-13 13:13</span>
								</div>

								<div className='recordBottomDiv'>
									<p>病症描述：</p>
									<span>我怎么怎么，哈哈哈哈啊啊啊，可能这 里不是很好呀？</span>
								</div>
							</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(RecordList);