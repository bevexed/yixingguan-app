import {
	AUTH_SUCCESS,
	ERROR_MSG,
	RECEIVE_USER,
	RESET_USER
} from "../action-types";

const initUser = {
	username: '',
	phone: '123',
	type: 'patient',
	isActive: true,
	msg: '',
	redirectTo: '' // 需要自动重定向的路由路径
};

export const user = (state = initUser, action) => {
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

