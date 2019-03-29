import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';

import './DocList.less'

import {
	List,
	Badge,
	Button
} from "antd-mobile";

const Item = List.Item;

class DocList extends Component {

	static propTypes = {
		doctorList: PropTypes.array.isRequired,
		identity: PropTypes.string,
		doReferrals: PropTypes.func
	};

	render() {
		const {doctorList, identity, doReferrals} = this.props;
		// noinspection JSUnresolvedVariable
		return (
			<div>
				<List className={'doc-list'}>
					{
						doctorList.map(doctor =>
							<Badge text={'温情推荐'} corner key={doctor.id} style={{display: doctor.is_reference ? 'block' : 'none'}}>
								<Item align={'middle'}>
									<div className={'doc'}>
										<img className="header-img" src={doctor.avatar} alt=""/>
										<div className={'brief'}>
											<header>
												<span className={'name'}>{doctor.name}</span>
												<span className={'subject'}>{doctor.department}</span>
												<span className={'level'}>{doctor.with_title}</span>
											</header>
											<section>
												<Badge text={doctor.hospital_level}
															 style={{
																 padding: '0 2px',
																 backgroundColor: '#fff',
																 borderRadius: 2,
																 color: '#FF9900',
																 border: '1px solid #ff9900',
																 fontSize: '10px'
															 }}/>
												<span className={'hospital'}>{doctor.affiliated_hospital}</span>
											</section>
											<footer>
												<p className={'master ellipsis'}>擅长：{doctor.introduction}</p>
											</footer>
										</div>
										{identity === 'doctor' ?
											<Button
												size="small"
												style={{width: 65, backgroundColor: '#68e3ce', color: '#fff', height: 30, borderRadius: 15}}
												onClick={() => doReferrals('http://' + window.location.host + '/order-doctor/' + doctor.id)}
											>
												转诊
											</Button>
											:
											<Button
												size="small"
												style={{width: 65, backgroundColor: '#68e3ce', color: '#fff', height: 30, borderRadius: 15}}
												onClick={() => this.props.history.push(`/order-doctor/${doctor.id}`)}
											>
												预约
											</Button>
										}
									</div>
								</Item>
							</Badge>
						)}
				</List>
			</div>
		);
	}
}

export default withRouter(DocList);
