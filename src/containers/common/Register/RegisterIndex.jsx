import React, {Component} from 'react';
import './Register.less'

class RegisterIndex extends Component {

	render() {
		return (
			<div className={'register'}>
				<span className={'title'}>
					为一千二百万患者提供问诊服务
				</span>
				<img className={'background'} src={require('./img/78-01@3x.png')} alt=""/>
				<div
					className={'button'}
					onClick={() => this.props.history.replace('/login')}
				>登录/注册
				</div>
			</div>
		);
	}
}

export default RegisterIndex;
