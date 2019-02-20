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
			selectedIcon: 'home-s.svg'
		},
		{
			pathname: '/doc',
			path: '',
			isActive: false,
			icon: 'doc.svg',
			selectedIcon: 'doc.svg'
		},
		{
			pathname: '/personal',
			path: '我的',
			isActive: false,
			icon: 'my.svg',
			selectedIcon: 'my-s.svg'
		}
	];

	render() {
		return (
			<div>
				<Switch>
					<Route path='/patient-index' component={PatientIndex}/>
					<Route path='/personal' component={Personal}/>
					<Route path='/order-doc/:docId' component={OrderDoc}/>
					<Route component={NotFound}/>
				</Switch>
				<NavFootPatient navs={this.navs}/>
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

