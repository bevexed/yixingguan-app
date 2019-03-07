import {
	UPDATA_PUBLICE_ARTICLE_IMG,
	UPDATA_PUBLICE_ARTICLE
} from "../action-types";

const updataPubliceArticleImg = img => ({type: UPDATA_PUBLICE_ARTICLE_IMG, data: img});

const updataPubliceArticle = content => ({type: UPDATA_PUBLICE_ARTICLE, data: content});
