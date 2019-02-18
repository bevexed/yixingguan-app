import React, {Component} from 'react';
import './App.css';

import {BrowserRouter, Route, Switch} from "react-router-dom";

import Test from './components/test/test'
import NotFound from './components/NotFound/NotFound'
import {Button} from "antd-mobile";

class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route exact path='/'/>
						<Route path='/test' component={Test}/>
						<Route component={NotFound}/> {/* 默认路由*/}
					</Switch>
				</BrowserRouter>
				<Button type="primary" size="small" inline>small</Button>
			</div>
		);
	}
}

export default App;
