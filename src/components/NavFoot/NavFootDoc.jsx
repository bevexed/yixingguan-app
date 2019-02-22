import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';

import './nav-foot.less'

import {TabBar} from "antd-mobile";

const Item = TabBar.Item;

class NavFootDoc extends Component {
	static propTypes = {
		doctorNav: PropTypes.array.isRequired
	};

	render() {
		const doctorNav = this.props.doctorNav;
		const path = this.props.location.pathname;
		return (
			<div className={'nav-foot-doc'}>
				<TabBar>
					{
						doctorNav.map(nav =>
							<Item
								selected={nav.pathname === path}
								key={nav.path}
								title={<span style={{color: nav.pathname === path ? '#68e3ce' : ''}}>{nav.path}</span>}
								icon={<img height={17} src={require(`./img/${nav.icon}`)} alt=""/>}
								selectedIcon={<img height={17} src={require(`./img/${nav.selectedIcon}`)} alt=""/>}
								onPress={() => this.props.history.replace(nav.pathname)}
							>

							</Item>
						)}
				</TabBar>
			</div>
		);
	}
}

export default withRouter(NavFootDoc);
