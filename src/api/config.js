// 开发环境

export const dev = {
	//线上
	// wx: {
	// 	"appID": "wx44c79818819144cb",
	// 	"redirect_uri": "http://47.75.74.89",
	// 	"un-scope": "snsapi_base",
	// 	"scope": "snsapi_userinfo"
	// },
	// host: 'http://47.75.74.89:81'
	// 线下
	wx: {
		"appID": "wx6ad3262297242b11",
		"redirect_uri": window.location.href,
		"un-scope": "snsapi_base",
		"scope": "snsapi_userinfo"
	},
	host: 'http://47.75.74.89:82'
};
