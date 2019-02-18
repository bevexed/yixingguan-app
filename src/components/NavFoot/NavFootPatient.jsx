import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";

import './nav-foot.less'

class NavFootPatient extends PureComponent {

	navs = [
		{
			pathname: '/',
			path: '首页',
			isActive: false,
			icon: require('./imgs/home.svg'),
			selectedIcon: require('./imgs/home-s.svg')
		},
		{
			pathname: '/doc',
			path: '',
			isActive: false,
			icon: require('./imgs/doc.svg'),
			selectedIcon: require('./imgs/doc.svg')
		},
		{
			pathname: '/person',
			path: '我的',
			isActive: false,
			icon: require('./imgs/my.svg'),
			selectedIcon: require('./imgs/my-s.svg')
		}
	];

	render() {
		this.navs.forEach(nav => nav.isActive = this.props.location.pathname === nav.pathname);
		return (
			<div className='nav-foot'>
				{
					this.navs.map(nav =>

						<span
							className={nav.isActive ? 'active' : null}
							key={nav.pathname}
							onClick={() => this.props.history.replace(nav.pathname)}
						>
							{nav.isActive ? <img src={nav.selectedIcon} alt=''/> : <img src={nav.icon} alt=''/>}{nav.path}
						</span>
					)
				}
			</div>
		);
	}
}

export default withRouter(NavFootPatient);
