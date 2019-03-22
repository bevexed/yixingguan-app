import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';

import './nav-foot.less'

class NavFootPatient extends PureComponent {

	static propTypes = {
		navs: PropTypes.array.isRequired
	};

	render() {
		const {navs} = this.props;
		navs.forEach(nav => nav.isActive = this.props.location.pathname === nav.pathname);
		return (
			<div className='nav-foot-patient'>
				<div className={'phone'}>客服热线：400-XXX-XXXX</div>
				<div className={'white-space'}>{null}</div>
				<div className="nav-foot">

					{
						navs.map(nav =>
								<span
									className={nav.isActive ? 'active' : null}
									key={nav.pathname}
									onClick={() => this.props.history.replace(nav.pathname)}
								>
									{nav.isActive ?
										<img src={require(`./img/${nav.selectedIcon}`)} alt=''/>
										: <img src={require(`./img/${nav.icon}`)} alt=''/>
									}
									{nav.path}
						</span>
						)
					}
				</div>
			</div>
		);
	}
}

export default withRouter(NavFootPatient);
