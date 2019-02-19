import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route} from "react-router-dom";

import NotFound from '../../components/NotFound/NotFound'
import NavFootPatient from '../../components/NavFoot/NavFootPatient'

import PatientIndex from '../PatientIndex/PatientIndex'
import Personal from "../Personal/Personal";

class Main extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path='/patient-index' component={PatientIndex}/>
					<Route path='/personal' component={Personal}/>
					<Route component={NotFound}/>
				</Switch>
				{<NavFootPatient/>}
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

