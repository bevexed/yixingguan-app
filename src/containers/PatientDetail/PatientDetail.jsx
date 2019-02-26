import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Icon, NavBar, List, WhiteSpace} from "antd-mobile";

import './PatientDetail.less'

const Item = List.Item;

const groups = ['心脏病', '糖尿病', '高血压','心脏病', '糖尿病', '高血压','心脏病', '糖尿病', '高血压'];


class PatientDetail extends Component {
	render() {
		return (
			<div className={'patient-detail'}>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>
					患者详情
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				{/*患者详情列表*/}
				<List>
					<Item
						extra={'赵胜德'}
					>
						患者姓名
					</Item>
					<Item
						extra={'14114111411'}
					>
						手机号码
					</Item>
					<Item wrap>
						病症描述:
						<WhiteSpace/>
						<p className={'pain-detail'}>
						 	我怎么怎么，哈哈哈哈啊啊啊，可能这里不是很好呀？
						</p>
					</Item>

					<Item>
						检查报告图片：
						<div className={'pic'}>
							<img src="" alt=""/>
							<img src="" alt=""/>
							<img src="" alt=""/>
							<img src="" alt=""/>
						</div>
					</Item>

					<Item>
						给患者添加标签
						<span className={'pain-detail'}>(添加病症给患者分类)</span>
						<WhiteSpace/>
						<div className={'tag'}>
							{
								groups.map(pain =>
									<span className={'pain'}>{pain}</span>
								)
							}
							<span className={'pain'}
								onClick={()=>alert(1)}
							>+</span>
						</div>
						<WhiteSpace/>
					</Item>
				</List>

				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<div className={'button'}>
					添加患者
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
)(PatientDetail);
