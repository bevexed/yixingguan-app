import {
	UPDATA_PUBLICE_ARTICLE_IMG,
	UPDATA_PUBLICE_ARTICLE,
	ALL_CAN_SEE,
	SELECT_SOME_CAN_SEE
} from "../action-types";

const initArticle = {
	content: '',
};

export const article_content = (state = initArticle, action) => {
	switch (action.type) {
		case UPDATA_PUBLICE_ARTICLE:
			return {...action.data};
		default:
			return state
	}
};

const initPic = {
	img: []
};

export const article_img = (state = initPic, action) => {
	switch (action.type) {
		case UPDATA_PUBLICE_ARTICLE_IMG:
			return {...action.data};
		default:
			return state
	}
};

const initWhoCanSee = {
	is_open: 1,
	allow_users: []
};

export const whoCanSee = (state = initWhoCanSee, action) => {
		switch (action.type) {
			case ALL_CAN_SEE:
				return {	is_open: 1, allow_users: []};
			case SELECT_SOME_CAN_SEE:
				const {allow_users} = state;
				const {label, user} = action.data;
				const labels = allow_users.map(sort => sort.label);

				if (labels.includes(label)) {
					allow_users[allow_users.findIndex(sort => label === sort.label)].user = user;
				} else {
					allow_users.push(action.data);
				}

				allow_users.forEach((sort, index) => {
					if (!sort.label || !sort.user.length) {
						allow_users.splice(index, 1)
					}
				});


				return {is_open: 0, allow_users};

			default:
				return state;
		}
	}
;
