import {
	reqDoctorDetail,
} from "../../api/patient";

import {
	doLogin,
	checkCode,
	reqUserData,
} from "../../api";

import {
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_DOCTOR_DETAILS,
	RECEIVE_USER,
} from "../action-types";

import {Toast} from "antd-mobile";
// order-doc 医生详情

const receiveDoctorDetails = doctor => ({type: RECEIVE_DOCTOR_DETAILS, data: doctor});

export const getDoctorDetail = (doctorId, history) => {
	return async dispatch => {
		reqDoctorDetail(doctorId).then(
			res => {
				if (res.code === 1) {
					dispatch(receiveDoctorDetails(res.data))
				} else {
					Toast.fail(res.message, 1, () => {
						history.replace('/patient-index')
					})
				}
			}
		)
	}
};

export const receiveUser = user => ({type: RECEIVE_USER, data: user});
export const authSuccess = user => ({type: AUTH_SUCCESS, data: user});
export const errorMsg = msg => ({type: ERROR_MSG, data: msg});

export const updataPhone = (phone, auto_code) => {
	return async dispatch => {

		phone = phone.replace(/\s+/g, "");
		if (!phone || phone.length < 11) {
			Toast.fail('手机号格式有误', 1);
			return
		}

		if (!auto_code) {
			Toast.fail('请输入验证码', 1);
			return
		}

		checkCode({phone, auto_code}).then(
			res => {
				if (res.code === 1) {
					dispatch(receiveUser({phone, auto_code}))
				} else {
					Toast.fail(res.message, 1);
				}
			}
		);
	}
};

export const updataUserType = userData => {
	let {identity} = userData;
	return dispatch => {
		doLogin({...userData}).then(
			res => {
				if (res.code === 1) {
					identity = identity === 1 ? 'patient' : 'doctor';
					let userData = {...res.data, identity};
					localStorage.token = res.data.token;

					dispatch(authSuccess(userData))
				} else {
					Toast.fail(res.message)
				}
			}
		)
	}
};

export const getUser = (token, callbacks) => {
	return async dispatch => {
		reqUserData(token).then(
			res => {
				if (res.code === 1) {
					let identity = res.data.identity;
					sessionStorage.username = res.data.username;
					sessionStorage.password = res.data.password;
					if (identity === 1 || identity === 2) {
						identity = identity === 1 ? 'patient' : 'doctor';
						// identity 有值 ，不在进行登录验证
						sessionStorage.already_get_user = true;
						sessionStorage.identity = identity;
					} else {
						sessionStorage.removeItem('already_get_user');
					}
					if (callbacks && sessionStorage.open_chat !== 'open') {
						// 聊天
						callbacks(res.data.username, res.data.password)
					}
					let userData = {...res.data, identity};
					dispatch(authSuccess(userData));
				} else {
					window.location.reload(true);
					dispatch(errorMsg(res.message));
				}
			}
		)
	}
};

