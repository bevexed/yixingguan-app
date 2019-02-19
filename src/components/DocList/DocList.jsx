import React, {Component} from 'react';
import {connect} from 'react-redux';

import './DocList.less'

import {
	List,
	WhiteSpace,
	Badge
} from "antd-mobile";
import Login from "../../containers/Login/Login";

const Item = List.Item;

class DocList extends Component {
	render() {
		return (
			<div>
				<List className={'doc-list'}>
					<Badge text={'温情推荐'} corner>
						<Item>
							<div className={'doc'}>
								<img className="header-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2825443055,3654672452&fm=27&gp=0.jpg" alt=""/>
								<div className={'brief'}>
									<header>
										<span className={'name'}>李峰</span>
										<span className={'subject'}>呼吸内科</span>
										<span className={'level'}>主治医师</span>
									</header>
									<section>
										<Badge text="三级甲等"
													 style={{
														 padding: '0 2px',
														 backgroundColor: '#fff',
														 borderRadius: 2,
														 color: '#FF9900',
														 border: '1px solid #ff9900',
														 fontSize: '10px'
													 }}/>
										<span className={'hospital'}>浙江省同立德医院</span>
									</section>
									<footer>
											<span className={'master'}>擅长：小二流行性感冒、小儿感冒、奶痫</span>
									</footer>
								</div>

							</div>
						</Item>
					</Badge>
				</List>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(DocList);
