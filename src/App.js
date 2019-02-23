import React, {Component} from 'react';
import './App.css';
import {Helmet} from "react-helmet";
import {Provider} from 'react-redux';

import store from './redux/store'
import {BrowserRouter, Route, Switch,HashRouter} from "react-router-dom";

import Login from './containers/Login/Login'

import RegisterIndex from './containers/Register/RegisterIndex';

import RegisterPhone from './containers/Register/RegisterPhone';
import SelectPlayer from './containers/Register/SelectPlayer';
import Main from "./containers/Main/Main";
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

				 	{/*<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.2/??flexible_css.js,flexible.js">{null}</script>*/}
				 	<script src="https://bevexed.top/yixingguan-app/src/static/flexible.js">{null}</script>
					<title>星医馆</title>

				</Helmet>

				<Provider store={store}>
					<BrowserRouter>
						<Switch>
							<Route path='/register-index' component={RegisterIndex}/>
							<Route path='/register-phone' component={RegisterPhone}/>
							<Route path='/select-player' component={SelectPlayer}/>

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
