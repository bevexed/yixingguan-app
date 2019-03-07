import {
	UPDATA_PUBLICE_ARTICLE_IMG,
	UPDATA_PUBLICE_ARTICLE
} from "../action-types";

export const updataPubliceArticleImg = img => ({type: UPDATA_PUBLICE_ARTICLE_IMG, data: img});

export const updataPubliceArticle = content => ({type: UPDATA_PUBLICE_ARTICLE, data: content});
