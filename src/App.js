import React, {Component} from 'react';
import './App.less';
import {Helmet} from "react-helmet";
import {Provider} from 'react-redux';

import store from './redux/store'
import {HashRouter, Route, Switch} from "react-router-dom";

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
					<script src="https://bevexed.top/frontEnd/yixingguan-app/src/static/flexible.js">{null}</script>
					{/*<script src="https://www.w3cways.com/demo/vconsole/vconsole.min.js?v=2.2.0">{null}</script>*/}

					<title>星医馆</title>

				</Helmet>

				<Provider store={store}>
					<HashRouter forceRefresh={false} basename={'/'}>
						<Switch>
							<Route component={Intercept}/>
						</Switch>
					</HashRouter>
				</Provider>
			</div>
		);
	}
}

export default App;
