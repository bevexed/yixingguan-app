import {combineReducers} from "redux";

import {
	RECEIVE_DOCTOR_LIST
} from "./action-types";

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


export default combineReducers({
	doctorList
})
