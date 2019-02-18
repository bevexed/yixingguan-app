import React, {PureComponent} from 'react';
import {NavLink} from "react-router-dom";

import './nav-foot.less'

class NavFootPatient extends PureComponent {
	render() {
		return (
			<div className='nav-foot'>
				<NavLink to='/'>首页</NavLink>
				<NavLink to='/person'>我的</NavLink>
			</div>
		);
	}
}

export default NavFootPatient;
