import {
	reqDoctorList
} from "../api";

import {
	RECEIVE_DOCTOR_LIST
} from "./action-types";

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
