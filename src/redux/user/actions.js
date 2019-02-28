import {
	reqDoctorDetail,
} from "../../api/patient";

import config from '../../../package.json'

import {
	doLogin,
	reqCode,
	reqToken
} from "../../api";

import {
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_DOCTOR_DETAILS,
	RECEIVE_USER,
} from "../action-types";

import {GetQueryString} from "../../utils";

// 获取 微信验证
export const getWxCode = () => {
	let appId = config.wx.appID;
	let scope = config.wx.scope;
	let redirect_uri = window.location.href;
	let code = GetQueryString('code');

	if (localStorage.token){
		return
	}

	if (!code) {
		reqCode(appId, redirect_uri, scope)
	} else {
		reqToken(code).then(
			res => {
				if (res.code === 1) {
					localStorage.token = res.data;
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

export const getUser = userData => {
	return async dispatch => {
		doLogin(userData).then(
			res => {
				if (res.code === 1) {
					dispatch(authSuccess(res.data));
				} else {
					dispatch(errorMsg(res.message));
				}
			}
		)
	}
};

