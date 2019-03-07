import {
	UPDATA_PUBLICE_ARTICLE_IMG,
	UPDATA_PUBLICE_ARTICLE
} from "../action-types";

const initArticle = {
	content: '',
};

export const article_content = (state=initArticle, action) => {
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

export const article_img = (state=initPic, action) => {
	switch (action.type) {
		case UPDATA_PUBLICE_ARTICLE_IMG:
			return {...action.data};
		default:
			return state
	}
};
