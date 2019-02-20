import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route} from "react-router-dom";

import NotFound from '../../components/NotFound/NotFound'
import NavFootPatient from '../../components/NavFoot/NavFootPatient'

import PatientIndex from '../PatientIndex/PatientIndex'
import Personal from "../Personal/Personal";
import OrderDoc from '../OrderDoc/OrderDoc'

class Main extends Component {
	navs = [
		{
			pathname: '/patient-index',
			path: '首页',
			isActive: false,
			icon: 'home.svg',
			selectedIcon: 'home-s.svg',
			component: PatientIndex
		},
		{
			pathname: '/doc',
			path: '',
			isActive: false,
			icon: 'doc.svg',
			selectedIcon: 'doc.svg',
			component: PatientIndex
		},
		{
			pathname: '/personal',
			path: '我的',
			isActive: false,
			icon: 'my.svg',
			selectedIcon: 'my-s.svg',
			component: Personal
		}
	];

	render() {
		return (
			<div>
				<Switch>
					{
						this.navs.map(nav =>
							<Route key={nav.pathname} path={nav.pathname} component={nav.component}/>
						)
					}
					<Route path='/order-doc/:docId' component={OrderDoc}/>
					<Route component={NotFound}/>
				</Switch>
				{
					this.navs.some(nav => nav.pathname === this.props.location.pathname)? <NavFootPatient navs={this.navs}/> : null
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Main);

