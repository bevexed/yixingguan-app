import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route} from "react-router-dom";

import HeaderMain from '../HeaderMain/HeaderMain'
import RecordList from '../RecordList/RecordList'

class Record extends Component {
    render() {
        return (
            <div>
							<Switch>
								<Route component={HeaderMain}/>
								<Route component={RecordList}/>
							</Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Record);
