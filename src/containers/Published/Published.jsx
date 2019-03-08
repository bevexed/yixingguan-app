import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Published.less'
import {NavBar, Icon, WhiteSpace} from "antd-mobile";

class Published extends Component {
	render() {
		return (
			<div className='published'>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
					rightContent={
						<Icon
							type={'cross'}
							size={'md'}
							color={'#000'}
							style={{transform: 'rotate(45deg)'}}
							onClick={() => this.props.history.push('/publish')}
						/>}
				>
					发布图文
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Published);
