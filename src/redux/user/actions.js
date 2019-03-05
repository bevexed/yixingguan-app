import {
	reqDoctorDetail,
} from "../../api/patient";

import config from '../../../package.json'

import {
	doLogin,
	reqCode,
	reqToken,
	checkCode,
	reqUserData,
} from "../../api";

import {
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_DOCTOR_DETAILS,
	RECEIVE_USER,
} from "../action-types";

import {GetQueryString} from "../../utils";

import {Toast} from "antd-mobile";

import Cookies from 'js-cookie';

// 获取 微信验证
export const getWxCode = getUser => {
	let appId = config.wx.appID;
	let scope = config.wx.scope;
	let redirect_uri = window.location.href;
	let code = GetQueryString('code');

	if (!code) {
		reqCode(appId, redirect_uri, scope)
	} else {
		localStorage.code = code;
		reqToken(code).then(
			res => {
				if (res.code === 1) {
					localStorage.code = code;
					const token = Cookies.get('token');
					getUser(token)
				} else {
					Cookies.remove('token');
				}
			}
		)
	}


};

// order-doc 医生详情

const receiveDoctorDetails = doctor => ({type: RECEIVE_DOCTOR_DETAILS, data: doctor});

export const getDoctorDetail = doctorId => {
	return async dispatch => {
		reqDoctorDetail(doctorId).then(
			res => {
				if (res.code === 1) {
					dispatch(receiveDoctorDetails(res.data))
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
	return dispatch => {
		doLogin({...userData}).then(
			res => {
				if (res.code === 1) {
					console.log(res);
					let identity = res.identity === 1 ? 'patient' : 'doctor';
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
					if (identity) {
						identity = identity === 1 ? 'patient' : 'doctor';
					}
					if (identity === 'doctor' && callbacks.length) {
						// 回调 病人列表
						callbacks.map(callback => callback(token))
					}

					let userData = {...res.data, identity};
					dispatch(authSuccess(userData));
				} else {
					Cookies.remove('token');
					getWxCode();
					dispatch(errorMsg(res.message));
				}
			}
		)
	}
};

