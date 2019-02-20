import React, {Component} from 'react';
import {connect} from 'react-redux';

import './OrderDoc.less'

import {
	Badge,
	Card,
	List,
	Accordion,
	Icon
} from "antd-mobile";

const Header = Card.Header;
const Footer = Card.Footer;

const Item = List.Item;
const Brief = Item.Brief;

class OrderDoc extends Component {
	onChange = (key) => {
		console.log(key);
	};

	render() {
		return (
			<div>

				<Card
					full
				>
					<div className={'back'}>
						<Icon
							type={'left'}
							size={'lg'}
							color={'white'}
							onClick={()=>this.props.history.goBack()}
						/>
					</div>
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

				<List>
					<Item
						multipleLine
					>擅长:
						<Brief>泌尿外科</Brief>
						<Brief>泌尿外科</Brief>
						<Brief>泌尿外科</Brief>
						<Brief>泌尿外科</Brief>
						<Brief>泌尿外科</Brief>
					</Item>

					<Item
						multipleLine
					>简介:
						<Brief>泌尿外科</Brief>
					</Item>

					<Accordion defaultActiveKey="" onChange={this.onChange}>
						<Accordion.Panel header={<span className={'accordion-header'}>查看详情</span>}>
							<List className="my-list">
								<List.Item>content 1</List.Item>
								<List.Item>content 2</List.Item>
								<List.Item>content 3</List.Item>
							</List>
						</Accordion.Panel>
					</Accordion>

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
)(OrderDoc);
