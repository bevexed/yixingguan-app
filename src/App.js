import React, {Component} from 'react';
import './App.css';
import {Button} from "antd-mobile";
import Test from './components/test/test'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Test/>
				<Button type="primary" size="small" inline>small</Button>
			</div>
		);
	}
}

export default App;
