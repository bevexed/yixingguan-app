import React, {Component} from 'react';
import './App.css';

import {Helmet} from "react-helmet";

import {Provider} from 'react-redux';
import store from './redux/store'

import {BrowserRouter, Route, Switch} from "react-router-dom";

import 'reset-css';

import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import Main from "./containers/Main/Main";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Helmet>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
					/>
					<title>星医馆</title>
				</Helmet>

				<Provider store={store}>
					<BrowserRouter>
						<Switch>
							<Route path='/register' component={Register}/>
							<Route path='/login' component={Login}/>
							<Route component={Main}/>
						</Switch>
					</BrowserRouter>
				</Provider>
			</div>
		);
	}
}

export default App;
