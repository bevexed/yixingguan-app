import React, {Component} from 'react';
import {connect} from 'react-redux';

import HeaderMain from '../HeaderMain/HeaderMain'
import RecordList from '../RecordList/RecordList'

class Record extends Component {
		constructor(props){
			super(props)
			this.obj = {
				title:'预约受理记录'
			}
		}
    render() {
        return (
            <div>
							<HeaderMain title='预约受理记录'/>
							<RecordList/>
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
