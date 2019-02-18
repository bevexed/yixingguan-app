import {combineReducers} from "redux";

const initUser = {};
const user = (state = initUser, action) => {
	switch (action.type) {
		case 1:
			return state;
		default:
			return state
	}
};

export default combineReducers({
	user
})
