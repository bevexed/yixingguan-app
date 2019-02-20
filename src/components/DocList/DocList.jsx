import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import './DocList.less'

import {
	List,
	Badge,
	Button
} from "antd-mobile";

const Item = List.Item;

class DocList extends Component {
	render() {
		return (
			<div>
				<List className={'doc-list'}>
					<Badge text={'温情推荐'} corner>
						<Item align={'middle'}>
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
										<p className={'master ellipsis'}>擅长：小二流行性感冒、小儿感冒、奶痫</p>
									</footer>
								</div>

								<Button
									size="small"
									style={{width: 65, backgroundColor: '#68e3ce', color: '#fff', height: 30, borderRadius: 15}}
									onClick={() => this.props.history.push('/order-doc/1')}
								>预约</Button>

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
)(withRouter(DocList));
