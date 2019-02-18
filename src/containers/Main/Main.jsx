import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch,Route} from "react-router-dom";

import NotFound from '../../components/NotFound/NotFound'
import NavFootPatient from '../../components/NavFoot/NavFootPatient'

class Main extends Component {
	render() {
		return (
			<div>
				<Switch>
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

