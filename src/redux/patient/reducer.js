import {
	RECEIVE_DOCTOR_LIST,
	RECEIVE_DOCTOR_DETAILS,
	SEEK_DOCTOR_LIST,
	RESET_DOCTOR_LIST,
} from "../action-types";
import {contactObject} from "../../utils";

const initDoctorList = {
		current_page: 0,
		total: 0,
		list: [{
			"id": 0,
			"avatar": "",
			"name": "",
			"department": "",
			"with_title": "",
			"hospital_level": "",
			"affiliated_hospital": "",
			"introduction": "",
			"is_reference": 0
		}]
	}
;

export const doctorList = (state = initDoctorList, action) => {
	state.list.forEach((doctor, index) => {
		if (doctor.id === 0) { state.list.splice(index, 1)}
	});
	switch (action.type) {
		case RECEIVE_DOCTOR_LIST:
			return contactObject(state, action.data);
		case RESET_DOCTOR_LIST:
			console.log('initDoctorList', initDoctorList);
			// return contactObject({}, action.data);
			return initDoctorList;
		default:
			return state;
	}
};

const initSeek = [];

export const seekDoctorList = (state = initSeek, action) => {
	switch (action.type) {
		case SEEK_DOCTOR_LIST:
			return [...action.data];
		default:
			return state;
	}
};

const initDoctorDetail = {
	id: 0,
	avatar: '',
	name: '',
	department: '',
	with_title: '',
	hospital_level: '',
	affiliated_hospital: '',
	introduction: '',
	is_reference: 0,
	seeing: 0
};

export const doctorDetail = (state = initDoctorDetail, action) => {
	switch (action.type) {
		case RECEIVE_DOCTOR_DETAILS:
			return action.data;
		default:
			return state;
	}
};

