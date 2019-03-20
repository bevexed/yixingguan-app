import React, {Component} from 'react';
import './App.less';
import {Helmet} from "react-helmet";
import {Provider} from 'react-redux';

import store from './redux/store'
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Intercept from './containers/common/RouterIntercept/Intercept'

// mate 标签
// require('./static/font');

class App extends Component {

	render() {
		return (

			<div className="App">
				<Helmet>
					<meta charSet="utf-8"/>
					<meta
						name="viewport"
						content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
					/>
					<title>星医馆</title>

				</Helmet>

				<Provider store={store}>
					<BrowserRouter forceRefresh={false} basename={'/'}>
						<Switch>
							<Route component={Intercept}/>
						</Switch>
					</BrowserRouter>
				</Provider>
			</div>
		);
	}
}

export default App;
