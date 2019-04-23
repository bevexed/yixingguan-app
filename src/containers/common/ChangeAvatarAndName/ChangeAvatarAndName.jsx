import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, InputItem, List, NavBar, Toast, WhiteSpace} from "antd-mobile";
import {getUser} from "../../../redux/user/action";
import {reqUpdateInfo} from "../../../api/patient";
import {reqDoctorInformation} from "../../../api/doctor";


const Item = List.Item;

class ChangeAvatarAndName extends Component {
	state = {
		name: '',
	};

	handelChange = (name, val) => {
		this.setState({
			[name]: val
		})
	};

	updata = () => {
		const avatar = [this.props.user.avatar];
		const {identity} = this.props.user;
		const {name} = this.state;
		const Information = {avatar, name};
		const token = sessionStorage.token;

		if (!avatar.length) {
			Toast.fail('请选择头像', 1);
			return
		}

		if (!name) {
			Toast.fail('请填写姓名', 1);
			return
		}
		if (identity === 'patient') {
			reqUpdateInfo({...Information}).then(
				res => {
					if (res.code === 1) {
						Toast.success('修改成功', 3, () => {
								this.props.getUser(token);
								this.props.history.goBack()
							}
						)
					} else {
						Toast.fail(res.message, 3)
					}
				}
			);
			return;
		}

		reqDoctorInformation({...Information}).then(
			res => {
				if (res.code === 1) {
					Toast.success(res.message, 3, () => {
						this.props.getUser(token);
						this.props.history.push('/doctor-personal')
					});
				} else {
					Toast.fail(res.message, 1)
				}
			}
		)


	};


	render() {
		const {avatar, selectAvatar} = this.props.user;
		const {name} = this.state;

		return (
			<div>
				<NavBar
					mode="light"
					className='nav-bar'
					icon={<Icon type="left" color={'#000'}/>}
					onLeftClick={() => this.props.history.goBack()}
				>修改姓名和头像</NavBar>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<List>
					<Item
						arrow='horizontal'
						onClick={() => this.props.history.push('/avatar')}
					>
						<img className='avator' src={selectAvatar ? selectAvatar : avatar} alt=""/>
					</Item>
				</List>

				<WhiteSpace/>


				<InputItem
					placeholder="请输入姓名"
					value={name}
					onChange={val => this.handelChange('name', val)}
				>姓名</InputItem>

				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>

				<div
					className='button'
					onClick={this.updata}
				>保存
				</div>

				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
				<WhiteSpace/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(
	mapStateToProps,
	{
		getUser,
	}
)(ChangeAvatarAndName);
