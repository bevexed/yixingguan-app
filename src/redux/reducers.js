import {combineReducers} from "redux";

import {
	RECEIVE_DOCTOR_LIST
} from "./action-types";

const initUser = {};
const user = (state = initUser, action) => {
	switch (action.type) {
		case 1:
			return state;
		default:
			return state
	}
};

const initDoctorList = {};

const doctorList = (state = initDoctorList, action) => {
	switch (action.type) {
		case RECEIVE_DOCTOR_LIST:
			return action.data;
		default:
			return state;
	}
};


export default combineReducers({
	user,
	doctorList
})
