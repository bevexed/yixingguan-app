import {
	LOGIN_SUCCESS_CHAT,
	RECEIVE_TEXT_MESSAGE,
	SEND_MESSAGE
} from "../action-types";

const initChatUser = {};

export const chatUser = (state = initChatUser, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS_CHAT:
			return {...action.data};
		default:
			return state
	}
};

const initMessage = [{
	chat_room: '',
	message: '',
	time: '',
	username: '',
}];

export const chatMsg = (state = initMessage, action) => {
	if (localStorage.message) {
		state = JSON.parse(localStorage.message)
	}


	switch (action.type) {
		case SEND_MESSAGE:
			state = [...state, action.data];
			localStorage.message = JSON.stringify(state);
			return state;
		case RECEIVE_TEXT_MESSAGE:
			state = [...state, action.data];
			localStorage.message = JSON.stringify(state);
			return state;
		default:
			return state;
	}
};
