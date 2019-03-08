import {
	UPDATA_PUBLICE_ARTICLE_IMG,
	UPDATA_PUBLICE_ARTICLE,
	SELECT_SOME_CAN_SEE,
	ALL_CAN_SEE
} from "../action-types";

import {reqReleaseShare} from "../../api/doctor";

import {Toast} from "antd-mobile";

export const updataPubliceArticleImg = img => ({type: UPDATA_PUBLICE_ARTICLE_IMG, data: img});

export const updataPubliceArticle = content => ({type: UPDATA_PUBLICE_ARTICLE, data: content});

export const selectSomeCanSee = personIds => ({type: SELECT_SOME_CAN_SEE, data: personIds});

export const allCanSee = () => ({type: ALL_CAN_SEE, data: {is_open: 1}});

export const pubulish = pub => {
	const {contents, picture, is_open, allow_users} = pub;
	const key = is_open === 1 ? {contents, picture, is_open} : {contents, picture, is_open, allow_users};
	
	reqReleaseShare(key)
		.then(res => {
			if (res.code === 1) {
				//todo: 去详情页面
				Toast.success('文章发布成功', 1,)
			} else {
				Toast.fail(res.message, 1)
			}
		})
};
