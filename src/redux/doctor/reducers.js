import {
	RECEIVE_PATIENT_LIST
} from "../action-types";

const InitPatientList = [
	{
		"id": '',
		"avatar": "",
		"name": "",
		"apply_time": "",
		"is_accept": 0
	}
];

export const patientList = (state = InitPatientList, action) => {
	switch (action.type) {
		case RECEIVE_PATIENT_LIST:
			return [...action.data];
		default:
			return state;
	}
};

