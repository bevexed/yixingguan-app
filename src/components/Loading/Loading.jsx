import React, {PureComponent} from 'react';
// import loading from '../../asset/img/20150210104951663.gif'
import './Loading.less'


class Loading extends PureComponent {
	render() {
		return (
			<div className='loading'>
				<div className="lds-rolling img">
					<div>{null}</div>
				</div>
			</div>
		);
	}
}

Loading.propTypes = {};

export default Loading;
