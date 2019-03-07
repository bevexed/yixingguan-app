import {
	UPDATA_PUBLICE_ARTICLE_IMG,
	UPDATA_PUBLICE_ARTICLE, ALL_CAN_SEE, SELECT_SOME_CAN_SEE
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
	allow_users: [{label: null, user: []}]
};

export const whoCanSee = (state = initWhoCanSee, action) => {
	switch (action.type) {
		case ALL_CAN_SEE:
			return {is_open: 1};
		case SELECT_SOME_CAN_SEE:
			return {is_open: 0, ...action.data}

	}
};
