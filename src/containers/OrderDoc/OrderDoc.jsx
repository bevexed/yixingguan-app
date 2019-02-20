import React, {Component} from 'react';
import {connect} from 'react-redux';

import './OrderDoc.less'

import {Badge, Card} from "antd-mobile";

const Header = Card.Header;
const Body = Card.Body;
const Footer = Card.Footer;

class OrderDoc extends Component {
	render() {
		return (
			<div>
				<Card
					full
				>
					<Header
						style={{background: '#68e3ce', padding: 10}}
						thumb={<img className={'header-img'} src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2825443055,3654672452&fm=27&gp=0.jpg" alt=""/>}
						title={
							<div>
								<header className={'title'}>
									<span className={'name'}>李峰</span>
									<span className={'subject'}>呼吸内科</span>
									<span className={'level'}>主治医师</span>
								</header>

								<section className={'hospital'}>
									<Badge text="三级甲等"
												 style={{
													 padding: '0 5px',
													 borderRadius: 2,
													 color: '#FFF',
													 background: '#FF9900',
													 fontSize: '12px'
												 }}/>
									<span>浙江省同立德医院</span>
								</section>

								<footer>
									<p>医生资质由平安保险承担</p>
								</footer>
							</div>
						}
					/>

					<Footer
						style={{background: '#68e3ce', padding: 10}}
						extra={<div style={{display: 'flex', justifyContent: 'flex-end'}}>
							<img height={14} style={{marginRight: 6}} src={require('../../asset/img/message.svg')} alt=""/>
							<span style={{color: '#fff'}}> 访问量 5670</span>
						</div>}
					/>
				</Card>



			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(OrderDoc);
