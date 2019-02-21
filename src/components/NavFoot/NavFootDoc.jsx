import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';

import {TabBar} from "antd-mobile";

const Item = TabBar.Item;

class NavFootDoc extends Component {
	static propTypes = {
		patientNav: PropTypes.array.isRequired
	};

	render() {
		const patientNav = this.props.patientNav;
		const path = this.props.location.pathname;
		return (
			<div>
				<TabBar>
					{
						patientNav.map(nav =>
							<Item
								selected={nav.pathname === path}
								key={nav.path}
								title={nav.path}
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
