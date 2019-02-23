import {
	reqDoctorList,
	reqDoctorDetail
} from "../../api/patient";

import {
	RECEIVE_DOCTOR_LIST,
	RECEIVE_DOCTOR_DETAILS,
} from "../action-types";

// 首页 医生 列表
const receiveDoctorList = doctorList => ({type: RECEIVE_DOCTOR_LIST, data: doctorList});

export const getDoctorList = () => {
	return async dispatch => {
		reqDoctorList().then(
			res => {
				if (res.code === 1) {
					dispatch(receiveDoctorList(res.data.data))
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

