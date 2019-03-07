import {
	RECEIVE_PATIENT_DETAILS,
	RECEIVE_PATIENT_LIST,
	RECEIVE_LABEL_LSIT, ACCEPT_PATIENT
} from "../action-types";

const InitLabalList = [
	{
		"id": 0,
		"label_name": null,
		"create_at": "",
		"user_names": [
			{
				"id": 0,
				"name": "",
				"initial": ""
			},
		]
	}
];

export const labelList = (state = InitLabalList, action) => {
	switch (action.type) {
		case RECEIVE_LABEL_LSIT:
			return [...action.data];
		default:
			return state
	}
};


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
		case ACCEPT_PATIENT:
			state.forEach(patient => {
				if (patient.id === action.data.id) {
					patient.is_accept = 1
				}
			});
			return [...state];
		default:
			return state;
	}
};

const InitPatientDetail = {
	"id": 0,
	"name": "",
	"phone": "",
	"symptoms_described": "",
	"inspection_report": "",
	"apply_time": "",
	"label": '',
	"is_accept": 0
};

export const patientDetail = (state = InitPatientDetail, action) => {
	switch (action.type) {
		case RECEIVE_PATIENT_DETAILS:
			return {...action.data};
		case ACCEPT_PATIENT:
			return {...state, ...action.data.is_accept};
		default:
			return state;
	}
};
