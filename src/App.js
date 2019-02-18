import React, {Component} from 'react';
import './App.css';

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
