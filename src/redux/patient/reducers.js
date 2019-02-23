import {
	RECEIVE_DOCTOR_LIST,
	RECEIVE_DOCTOR_DETAILS,
} from "../action-types";

const initDoctorList = [
	{
		"id": "",
		"avator": "",
		"name": "",
		"department": "",
		"with_title": "",
		"hospital_level": "",
		"affiliated_hospital": "",
		"good_at": "",
		"is_reference": ""
	}
];

export const doctorList = (state = initDoctorList, action) => {
	switch (action.type) {
		case RECEIVE_DOCTOR_LIST:
			return action.data;
		default:
			return state;
	}
};

const initDoctorDetail = {
	"id": 0,
	"avator": "",
	"name": "",
	"department": "",
	"with_title": "",
	"hospital_level": "",
	"affiliated_hospital": "",
	"good_at": "",
	"is_reference": 0,
	"introduction": "",
	"seeing": 0
};

export const doctorDetail = (state = initDoctorDetail, action) => {
	switch (action.type) {
		case RECEIVE_DOCTOR_DETAILS:
			return action.data;
		default:
			return state;
	}
};

