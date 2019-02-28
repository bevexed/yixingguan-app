import {
	reqDoctorDetail,
} from "../../api/patient";

import config from '../../../package.json'

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
	console.log(config.wx);
	let appId = config.wx.appID;
	let redirect_uri = config.wx.redirect_uri;
	let scope = config.wx.scope;
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

