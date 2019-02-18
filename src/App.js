import React, {Component} from 'react';
import './App.css';

import {Provider} from 'react-redux';
import store from './redux/store'

import {BrowserRouter, Route, Switch} from "react-router-dom";

import Main from "./containers/Main/Main";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Provider store={store}>
					<BrowserRouter>
						<Switch>
							<Route exact path='/'/>
							<Route component={Main}/>
						</Switch>
					</BrowserRouter>
				</Provider>
			</div>
		);
	}
}

export default App;
