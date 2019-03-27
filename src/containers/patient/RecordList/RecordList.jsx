import React, {Component} from 'react';
import './RecordList.less'
import {Icon, NavBar, WhiteSpace} from "antd-mobile";

import {reqSubscribeLists} from "../../../api/patient";

class RecordList extends Component {
	state = {
		data: {}
	};

	componentDidMount() {
		reqSubscribeLists()
			.then(
				res => {
					if (res.code) {
						this.setState({data: res.data})
					}
				}
			)
	}

	render() {
		const {finished = [], unfinished = []} = this.state.data;

		return (
			<div className={'record-list'}>
				<NavBar
					mode="light"
					icon={<Icon type="left" color={'#000'} size={'md'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>
					预约受理记录
				</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<div className='recordList'>
					{unfinished.length ? <p className='recordP'>进行中</p> : null}

					{
						unfinished.map(item =>
							<div className='recordDiv' key={item.id}>
								<div>
									<div>
										<img className='appointAvatar' alt='' src={item.avatar}/>
										<div className='appointInfo'>
											<div>
												<p className='appointName'>{item.name}</p>
												<span className='appointSpan'>{item.department}</span>
												<span>{item.with_title}</span>
											</div>
											<div>
												<p className='appointGrade'>{item.hospital_level}</p>
												<span>{item.affiliated_hospital}</span>
											</div>
										</div>
									</div>
									<span>{item.apply_time}</span>
								</div>

								<div className='recordBottomDiv'>
									<p>病症描述：</p>
									<span>{item.symptoms_described}</span>
								</div>
							</div>
						)}
				</div>
				<div className='recordList'>
					{finished.length ? <p className='recordP' style={{background: "#FF9900"}}>历史记录</p> : null}

					{
						finished.map(item =>
							<div className='recordDiv' key={item.id}>
								<div>
									<div>
										<img className='appointAvatar' alt='' src={item.avatar}/>
										<div className='appointInfo'>
											<div>
												<p className='appointName'>{item.name}</p>
												<span className='appointSpan'>{item.department}</span>
												<span>{item.with_title}</span>
											</div>
											<div>
												<p className='appointGrade'>{item.hospital_level}</p>
												<span>{item.affiliated_hospital}</span>
											</div>
										</div>
									</div>
									<span>{item.apply_time}</span>
								</div>

								<div className='recordBottomDiv'>
									<p>病症描述：</p>
									<span>{item.symptoms_described}</span>
								</div>
							</div>
						)}
				</div>
			</div>
		);
	}
}

export default RecordList
