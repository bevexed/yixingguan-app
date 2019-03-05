import {
	reqPatientList
} from "../../api/doctor";

import {
	RECEIVE_PATIENT_LIST
} from "../action-types";

import {Toast} from "antd-mobile";


const receivePatientList = PatientList => ({type: RECEIVE_PATIENT_LIST, data: PatientList});

export const getPatientList = token => {
	return async dispatch => {
		reqPatientList(token)
			.then(
				res => {
					if (res.code === 1) {
						dispatch(receivePatientList(res.data))
					} else {
						Toast.fail(res.message)
					}
				}
			)
	}
};

