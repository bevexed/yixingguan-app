import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, NavBar} from "antd-mobile";

class Doctors extends Component {
	render() {
		return (
			<div>
				<NavBar
					mode={'light'}
					rightContent={
						<Icon
							type={'cross'}
							size={'md'}
							color={'#000'}
							style={{transform: 'rotate(45deg)'}}
							onClick={()=>alert('add')}
						/>}
				>
					我的医生
				</NavBar>
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
