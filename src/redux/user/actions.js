import {
	reqDoctorDetail,
} from "../../api/patient";

import {
	doLogin,
	reqCode
} from "../../api";

import {
	AUTH_SUCCESS, ERROR_MSG,
	RECEIVE_DOCTOR_DETAILS,
	RECEIVE_USER,
} from "../action-types";

// 获取 微信验证
export const getWxCode = () => {
	let appId = 'wx6ad3262297242b11';
	let redirect_uri = 'http://192.168.1.8:3000';
	let scope = 'snsapi_base';
	reqCode(appId, redirect_uri, scope)
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

