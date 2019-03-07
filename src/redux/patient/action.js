import {
	reqDoctorList,
	reqDoctorDetail,
	reqSeeks
} from "../../api/patient";

import {
	RECEIVE_DOCTOR_LIST,
	RECEIVE_DOCTOR_DETAILS, SEEK_DOCTOR_LIST,
} from "../action-types";

// 首页 医生 列表
const receiveDoctorList = doctorList => ({type: RECEIVE_DOCTOR_LIST, data: doctorList});

export const getDoctorList = ({locating_city, page, city, department}) => {
	return async dispatch => {
		reqDoctorList({locating_city, page, city, department}).then(
			res => {
				if (res.code === 1) {
					dispatch(receiveDoctorList(res.data))
				}
			}
		)
	}
};

const seekDoctorList = doctorList =>({type:SEEK_DOCTOR_LIST,data:doctorList});

export const getSeekDoctorList = title => {
	return async dispatch => {
		reqSeeks(title).then(
			res => {
				if (res.code === 1 && res.data) {
					dispatch(seekDoctorList(res.data))
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
