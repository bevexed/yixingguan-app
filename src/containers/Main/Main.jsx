import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from "react-router-dom";

import NotFound from '../../components/NotFound/NotFound'
import NavFootPatient from '../../components/NavFoot/NavFootPatient'
import NavFootDoc from '../../components/NavFoot/NavFootDoc'

import {GetQueryString, getRedirectTo} from "../../utils";

import {patientNav, patientRoute} from '../../router/patient'

import {doctorNav, doctorRoute} from "../../router/doctor";
import {getWxCode} from "../../redux/user/actions";

class Main extends Component {
	state = {
		type: 'doctor',
		code: '',
	};


	componentWillMount() {
		let code = GetQueryString('code');

		if (!code) {
			getWxCode()
		} else {
			this.setState({
				code
			});
		}
	}

	render() {
		const {identity, phone} = this.props.user;
		const {pathname} = this.props.location;
		const route = identity === 'patient' ? patientRoute : doctorRoute;
		const nav = identity === 'patient' ? patientNav : doctorNav;
		const showNav = nav.some(nav => nav.pathname === pathname);

		if (!phone) {
			return <Redirect to={getRedirectTo(identity, phone)}/>
		}

		if (pathname === '/') {
			return <Redirect to={getRedirectTo(identity, phone)}/>
		}

		return (
			<div>
				<Switch>
					{
						route.map(nav =>
							<Route key={nav.pathname} path={nav.pathname} component={nav.component}/>
						)
					}
					<Route component={NotFound}/>
				</Switch>
				{
					showNav ?
						identity === 'patient' ? <NavFootPatient navs={nav}/> : < NavFootDoc doctorNav={nav}/>
						: null
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(
	mapStateToProps,
)(Main);

