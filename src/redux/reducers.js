import {combineReducers} from "redux";

import {
	RECEIVE_DOCTOR_LIST,
	RECEIVE_DOCTOR_DETAILS,
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_USER,
	RESET_USER
} from "./action-types";

const initUser = {
	username: '',
	phone: '123',
	type: 'doctor',
	isActive: false,
	msg: '',
	redirectTo: '' // 需要自动重定向的路由路径
};

const user = (state = initUser, action) => {
	switch (action.type) {
		case AUTH_SUCCESS:
			return state;
		case ERROR_MSG:
			return state;
		case RESET_USER:
			return state;
		case RECEIVE_USER:
			return {...state, ...action.data};
		default:
			return state;
	}
};


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

const doctorList = (state = initDoctorList, action) => {
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

const doctorDetail = (state = initDoctorDetail, action) => {
	switch (action.type) {
		case RECEIVE_DOCTOR_DETAILS:
			return action.data;
		default:
			return state;
	}
};


export default combineReducers({
	user,
	doctorList,
	doctorDetail
})
