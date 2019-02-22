import React, {Component} from 'react';
import {connect} from 'react-redux';
import './DoctorIndex.less'

import {
	Result,
	WhiteSpace,
	List,
	Badge,
	SearchBar
} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class DoctorIndex extends Component {
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
						onClick={() => {
						}}
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
							onCancel={() => console.log('1')}
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
