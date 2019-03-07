import {
	RECEIVE_DOCTOR_LIST,
	RECEIVE_DOCTOR_DETAILS,
	SEEK_DOCTOR_LIST
} from "../action-types";

const initDoctorList = {
	current_page: 1,
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
	}],
	total: 1
};

export const doctorList = (state = initDoctorList, action) => {
	switch (action.type) {
		case RECEIVE_DOCTOR_LIST:
			return {...action.data};
		case SEEK_DOCTOR_LIST:
			return {current_page: 1,list:[...action.data],total: 1};
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
