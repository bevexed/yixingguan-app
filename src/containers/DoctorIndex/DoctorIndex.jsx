import React, {Component} from 'react';
import {connect} from 'react-redux';
import './DoctorIndex.less'

import {
	Result,
	WhiteSpace,
	List,
	Badge,
	SearchBar,
	Modal,
} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const pains = [1, 2, 3, 4];

function closest(el, selector) {
	// noinspection JSUnresolvedVariable
	const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
	while (el) {
		if (matchesSelector.call(el, selector)) {
			return el;
		}
		el = el.parentElement;
	}
	return null;
}

class DoctorIndex extends Component {
	state = {
		modal: false,
		pain: []
	};

	showModal = key => (e) => {
		console.log(e);
		// e.preventDefault(); // 修复 Android 上点击穿透
		this.setState({
			[key]: true,
		});
	};
	onClose = key => () => {
		this.setState({
			[key]: false,
		});
	};

	onWrapTouchStart = (e) => {
		// fix touch to scroll background page on iOS
		if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
			return;
		}
		const pNode = closest(e.target, '.am-modal-content');
		if (!pNode) {
			e.preventDefault();
		}
	};

	selectPain = select => {
		let pain = this.state.pain;
		if (pain.includes(select)) {
			let index = pain.findIndex(item => item === select);
			pain.splice(index, 1)
		} else {
			pain = [...pain, select];
			pain = Array.from(new Set(pain));
		}
		this.setState({pain})
	};


	render() {
		return (
			<div className="doctor-index">
				<Result
					img={<img className={'avator'} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551407674&di=ec267c3e88e04ffe96d351b62c7a38a7&imgtype=jpg&er=1&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F170914%2F0220055L1-9.jpg" alt=""/>}
					title={<p className={'name'}>李医生 <img className={'sex'} src={require('./img/male@3x.png')} alt=""/></p>}
				/>
				<WhiteSpace/>

				<List>
					<Item
						thumb={<img src={require('./img/Medical@3x.png')} alt=""/>}
						arrow={'horizontal'}
						extra={<Badge text={77} overflowCount={99}/>}
						onClick={() => this.props.history.push('/new-patient/12')}
					>新增患者</Item>
				</List>

				<WhiteSpace/>

				<List>
					<Item
					>
						<SearchBar
							placeholder="患者姓名"
							maxLength={8}
							showCancelButton
							cancelText={<img src={require('./img/shaixuan@3x.png')} alt=""/>}
							onCancel={this.showModal('modal')}
						/>
						<WhiteSpace/>
					</Item>
					<Item
						thumb={<img className={'patient-avator'} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551407674&di=ec267c3e88e04ffe96d351b62c7a38a7&imgtype=jpg&er=1&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F170914%2F0220055L1-9.jpg" alt=""/>}
						multipleLine
					>
						照应听
						<Brief>
							<p className={'patient-message'}>
								向您发送了一张照片 <span className={'time'}>2019-02-13 13:13</span>
							</p>
						</Brief>
					</Item>
				</List>

				<Modal
					className={'pain'}
					visible={this.state.modal}
					transparent
					maskClosable={false}
					onClose={this.onClose('modal')}
					title={'病症'}
					wrapProps={{onTouchStart: this.onWrapTouchStart}}
					afterClose={() => {
						alert('afterClose');
					}}
				>
					<div style={{height: 300, overflow: 'scroll'}}>
						<div className={'list'}>
							{pains.map(pain =>
								<div className={this.state.pain.includes(pain) ? 'item active' : 'item'}
										 key={pain}
										 onClick={() => this.selectPain(pain)}
								>心脏病
								</div>)
							}
						</div>
					</div>

					<div className={'footer'}>
						<div className={'button'}
								 onClick={() => this.setState({pain: []})}>清空
						</div>
						<div className={'button'}
								 onClick={this.onClose('modal')}
						>完成
						</div>
					</div>
				</Modal>
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
