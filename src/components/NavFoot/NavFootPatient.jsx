import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";

import './nav-foot.less'

class NavFootPatient extends PureComponent {

	navs = [
		{
			pathname: '/patient-index',
			path: '首页',
			isActive: false,
			icon: require('./img/home.svg'),
			selectedIcon: require('./img/home-s.svg')
		},
		{
			pathname: '/doc',
			path: '',
			isActive: false,
			icon: require('./img/doc.svg'),
			selectedIcon: require('./img/doc.svg')
		},
		{
			pathname: '/personal',
			path: '我的',
			isActive: false,
			icon: require('./img/my.svg'),
			selectedIcon: require('./img/my-s.svg')
		}
	];

	render() {
		this.navs.forEach(nav => nav.isActive = this.props.location.pathname === nav.pathname);
		return (
			<div className="nav-foot">
				{
					this.navs.map(nav =>

						<span
							className={nav.isActive ? 'active' : null}
							key={nav.pathname}
							onClick={() => this.props.history.replace(nav.pathname)}
						>
						 <img src={nav.selectedIcon} alt='' style={{display: nav.isActive ? 'block' : 'none'}}/>
						 <img src={nav.icon} alt='' style={{display: nav.isActive ? 'none' : 'block'}}/>
							{nav.path}
						</span>
					)
				}
			</div>
		);
	}
}

export default withRouter(NavFootPatient);
