import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar, WhiteSpace, List} from "antd-mobile";
import './PublicSelectSort.less'

const Item = List.Item;

class PublishSelectSort extends Component {
	render() {
		const {labelList} = this.props;
		const labels = labelList.map(label => {
			if (label.label_name) {return label.label_name;} else {return null}
		});


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
						activeStyle={{border: '1Px solid #aaa'}}
						multipleLine
					>
						公开
					</Item>
				</List>

				<WhiteSpace/>
				{
					labels.map((label,index) =>

						<List
							key={index}
						>
							<Item
								thumb={<img src={require('./img/fenzu@3x.png')} alt=""/>}
								extra={<span>{null}</span>}
								activeStyle={{border: '1Px solid #aaa'}}
								multipleLine
								arrow={'horizontal'}
							>
								{label}
							</Item>
						</List>)
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		labelList: state.labelList
	};
}

export default connect(
	mapStateToProps,
)(PublishSelectSort);

