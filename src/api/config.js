// 开发环境
const online = {
	wx: {
		"appID": "wxccaff9d71833a8b2",
		"redirect_uri": "http://dayao.tianyue0571.cn",
		"scope": "snsapi_userinfo"
	},
	host: 'http://admin.tianyue0571.cn'
};

const offline = {
	wx: {
		"appID": "wx6ad3262297242b11",
		"redirect_uri": window.location.href,
		"scope": "snsapi_userinfo"
	},
	host: 'http://47.75.74.89:81'
};

export const dev = window.location.href.indexOf('192.168.1') > -1 ? offline : online;
