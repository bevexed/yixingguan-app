import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderMain from '../HeaderMain/HeaderMain'
import './Count.less'
import '../../static/iconfont/iconfont.css'

import Echarts from '../../containers/Statistics/Statistics'
class Count extends Component {
	constructor(props){
		super(props)
		this.obj = {
			title:'统计'
		}
	}
    render() {
        return (
            <div className='countBox'>
							<HeaderMain title='统计'/>
							<div className='countTop'>
								<span>2019/01/01-2019/02/14</span>
								<img src={require('./img/shaixuan.png')} alt='' />
							</div>
							<div className='showDiv'>
								<span className='iconfont icon-back'></span>
								<Echarts />
								<span className='iconfont icon-next'></span>
							</div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Count);
