import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Badge, Icon, List, NavBar, WhiteSpace} from "antd-mobile";

import {reqPeerList} from "../../../api/doctor";

const Item = List.Item;

class InviteDoctorList extends Component {

	state = {
		doctorList: []
	};

	componentDidMount() {
		reqPeerList().then(
			res => {
				if (res.code === 1) {
					this.setState({
						doctorList: res.data
					})
				}
			}
		)
	}


	render() {
		const {doctorList} = this.state;
		return (
			<div>
				<NavBar
					mode="light"
					className={'nav-bar'}
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>
					邀请同行详情
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List className={'doc-list'}>
					{
						doctorList.map(doctor =>
							<Badge text={'温情推荐'} corner key={doctor.id} style={{display: doctor.is_reference ? 'block' : 'none'}}>
								<Item align={'middle'}>
									<div className={'doc'}>
										<img className="header-img" src={doctor.avatar} alt=""/>
										<div className={'brief'} style={{marginLeft: 10}}>
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
												<p className={'master ellipsis'}>城市：{doctor.city}</p>
											</footer>
										</div>
									</div>
								</Item>
							</Badge>
						)}
				</List>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(InviteDoctorList);

