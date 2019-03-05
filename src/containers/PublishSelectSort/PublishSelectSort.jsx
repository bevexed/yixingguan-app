import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, WhiteSpace, List} from "antd-mobile";
import './PublicSelectSort.less'

const Item = List.Item;

class PublishSelectSort extends Component {
	render() {
		return (
			<div className='publish-select-sort'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
					rightContent={<div className={'button'}>完成</div>}
				>谁可以看</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List>
					<Item
						thumb={<img src={require('./img/gongkai未选择@3x.png')} alt=""/>}
						extra={<span>所有患者可看</span>}
						activeStyle={{border:'1Px solid #aaa'}}
						multipleLine
					>
						公开
					</Item>
				</List>

				<WhiteSpace/>

				<List>
					<Item
						thumb={<img src={require('./img/gongkai未选择@3x.png')} alt=""/>}
						extra={<span>所有患者可看</span>}
						activeStyle={{border:'1Px solid #aaa'}}
						multipleLine
					>
						公开
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
)(PublishSelectSort);

