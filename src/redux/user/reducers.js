import {
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_USER,
	RESET_USER
} from '../action-types';

const initUser = {
	avatar: '',
	name: '',
	sex: 1,
	birth: '',
	affiliated_hospital: '',
	hospital_level: '',
	city: '',
	department: '',
	with_title: '',
	introduction: '',
	vocational_certificate: '',
	is_reference: 0,
	seeing: 0,
	is_audit: true,
	institutions: '',
	phone: 123123123,
	identity: 'patient',
	redirectTo: '' // 需要自动重定向的路由路径
};

export const user = (state = initUser, action) => {
	switch (action.type) {
		case AUTH_SUCCESS:
			return state;
		case ERROR_MSG:
			return action.data;
		case RESET_USER:
			return state;
		case RECEIVE_USER:
			return {...state, ...action.data};
		default:
			return state;
	}
};

