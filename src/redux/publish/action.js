import {
	UPDATA_PUBLICE_ARTICLE_IMG,
	UPDATA_PUBLICE_ARTICLE,
	SELECT_SOME_CAN_SEE,
	ALL_CAN_SEE
} from "../action-types";

export const updataPubliceArticleImg = img => ({type: UPDATA_PUBLICE_ARTICLE_IMG, data: img});

export const updataPubliceArticle = content => ({type: UPDATA_PUBLICE_ARTICLE, data: content});

export const selectSomeCanSee = personIds => ({type: SELECT_SOME_CAN_SEE, data: personIds});

export const allCanSee = () => ({type: ALL_CAN_SEE, data: {is_open: 1}});
