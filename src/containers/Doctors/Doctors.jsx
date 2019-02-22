import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Doctors.less'
import {
	Accordion,
	Icon,
	NavBar,
	Button, WhiteSpace
} from "antd-mobile";

const Panel = Accordion.Panel;

const docs = [true, false];

class Doctors extends Component {

	panelChange = (key) => {
		console.log(key);
	};

	toMessage = (el, id) => {
		el.stopPropagation();
		this.props.history.push(`/message/${id}`)
	};


	render() {
		return (
			<div className={'doctors'}>
				<NavBar
					mode={'light'}
					rightContent={
						<Icon
							type={'cross'}
							size={'md'}
							color={'#000'}
							style={{transform: 'rotate(45deg)'}}
							onClick={() => alert('add')}
						/>}
				>
					我的医生
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<Accordion
					accordion
					className="my-accordion"
					onChange={this.panelChange}
				>
					{docs.map(doc =>


						<Panel
							className={doc ? 'panel' : null}
							key={doc}
							header={
								<div className={'content'}
										 onClick={el => this.toMessage(el, doc)}
								>
									<img className={'header-img'} src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2825443055,3654672452&fm=27&gp=0.jpg" alt=""/>
									<div className={'doc-brief ellipsis'}>
										<span className={'name'}>李峰</span>
										<span className={'subject'}>呼吸内科</span>
										<span className={'level'}>主治医师</span>
										<span className={'hospital'}>浙江省立同德医院</span>

										<p className={'ellipsis'}>
											李医生，我最近嗓子疼，有什么办法解决吗？sadsadsadasdsadsadsadas
										</p>
									</div>
								</div>
							}
						>
							<div className='btn-group'>
								<Button>拒绝推送</Button>
								<Button>删除</Button>
							</div>

						</Panel>
					)}
				</Accordion>


			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Doctors);
