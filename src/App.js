import React, {Component} from 'react';
import './App.less';
import {Helmet} from "react-helmet";
import {Provider} from 'react-redux';

import store from './redux/store'
import {BrowserRouter, Route, Switch, Redirect,withRouter} from "react-router-dom";

import Login from './containers/Login/Login'

import RegisterIndex from './containers/Register/RegisterIndex';

import RegisterPhone from './containers/Register/RegisterPhone';
import SelectPlayer from './containers/Register/SelectPlayer';
import Main from "./containers/Main/Main";

// mate 标签
// require('./static/font');

import Cookies from 'js-cookie';

class App extends Component {

	render() {
		const token = Cookies.get('token');

		return (

			<div className="App">
				<Helmet>
					<meta charSet="utf-8"/>
					<meta
						name="viewport"
						content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
					/>

					{/*<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.2/??flexible_css.js,flexible.js">{null}</script>*/}
					<script src="https://bevexed.top/frontEnd/yixingguan-app/src/static/flexible.js">{null}</script>
					<title>星医馆</title>

				</Helmet>

				<Provider store={store}>
					<BrowserRouter>
						<Switch>
							{/*路由拦截*/}
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
