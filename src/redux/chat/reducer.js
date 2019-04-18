import {
	DELETE_CHAT,
	LOGIN_SUCCESS_CHAT,
	READ_MESSAGE,
	RECEIVE_IMG,
	RECEIVE_TEXT_MESSAGE,
	SEND_IMG,
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
	imgUrl: '',
	read: true
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
		case SEND_IMG:
			state = [...state, action.data];
			localStorage.message = JSON.stringify(state);
			return state;
		case RECEIVE_IMG:
			state = [...state, action.data];
			localStorage.message = JSON.stringify(state);
			return state;
		case DELETE_CHAT:
			state = state.filter(chat => chat.chat_room !== action.data);
			localStorage.message = JSON.stringify(state);
			return state;
		case READ_MESSAGE:
			const chat_room = action.data;
			state.forEach(chat => {
				if (chat.chat_room === chat_room) {
					chat.read = true
				}
			});
			localStorage.message = JSON.stringify(state);
			return state;
		default:
			return state;
	}
};
