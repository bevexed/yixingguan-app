require('strophe.js');
const WebIM = require('easemob-websdk');

WebIM.config = {
	xmppURL: 'im-api.easemob.com',            // xmpp Server地址，对于在console.easemob.com创建的appKey，固定为该值

	apiURL: 'http://a1.easemob.com',          // rest Server地址，对于在console.easemob.com创建的appkey，固定为该值

	appkey: '1102190312181996#yi-xing-guan',        // App key

	https: true,                            // 是否使用https

	isMultiLoginSessions: false,              // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能

	isAutoLogin: false,                        // 自动出席，（如设置为false，则表示离线，无法收消息，需要在登录成功后手动调用conn.setPresence()才可以收消息）

	isDebug: true,                           // 打开调试，会自动打印log，在控制台的console中查看log

	autoReconnectNumMax: 2,                   // 断线重连最大次数

	autoReconnectInterval: 2,                 // 断线重连时间间隔

	heartBeatWait: 4500,                       // 使用webrtc（视频聊天）时发送心跳包的时间间隔，单位ms

	delivery: true,                           // 是否发送已读回执
};


const conn = new WebIM.connection({
	isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : window.location.protocol === 'https:',
	url: WebIM.config.xmppURL,
	heartBeatWait: WebIM.config.heartBeatWait,
	autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	autoReconnectInterval: WebIM.config.autoReconnectInterval,
	apiUrl: WebIM.config.apiURL,
	isAutoLogin: true
});

conn.listen({
	onOpened: function (message) {          //连接成功回调
		// 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
		// 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
		// 则无需调用conn.setPresence();
	},
	onClosed: function (message) {
	},         //连接关闭回调
	onTextMessage: function (message) {
	},    //收到文本消息
	onEmojiMessage: function (message) {
	},   //收到表情消息
	onPictureMessage: function (message) {
	}, //收到图片消息
	onCmdMessage: function (message) {
	},     //收到命令消息
	onAudioMessage: function (message) {
	},   //收到音频消息
	onLocationMessage: function (message) {
	},//收到位置消息
	onFileMessage: function (message) {
	},    //收到文件消息
	onVideoMessage: function (message) {
		var node = document.getElementById('privateVideo');
		var option = {
			url: message.url,
			headers: {
				'Accept': 'audio/mp4'
			},
			onFileDownloadComplete: function (response) {
				var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
				node.src = objectURL;
			},
			onFileDownloadError: function () {
				console.log('File down load error.')
			}
		};
		WebIM.utils.download.call(conn, option);
	},   //收到视频消息
	onPresence: function (message) {
	},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
	onRoster: function (message) {
	},         //处理好友申请
	onInviteMessage: function (message) {
	},  //处理群组邀请
	onOnline: function () {
	},                  //本机网络连接成功
	onOffline: function () {
	},                 //本机网络掉线
	onError: function (message) {
	},          //失败回调
	onBlacklistUpdate: function (list) {       //黑名单变动
		// 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
		console.log(list);
	},
	onReceivedMessage: function (message) {
	},    //收到消息送达服务器回执
	onDeliveredMessage: function (message) {
	},   //收到消息送达客户端回执
	onReadMessage: function (message) {
	},        //收到消息已读回执
	onCreateGroup: function (message) {
	},        //创建群组成功回执（需调用createGroupNew）
	onMutedMessage: function (message) {
	}        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
});

// 注册
let options = {
	username: 'username',
	password: 'password',
	nickname: 'nickname',
	appKey: WebIM.config.appkey,
	success: function () {
	},
	error: function () {
	},
	apiUrl: WebIM.config.apiURL
};
conn.registerUser(options);

{
	// 登录
	let options = {
		apiUrl: WebIM.config.apiURL,
		user: 'username',
		pwd: 'password',
		appKey: WebIM.config.appkey
	};
	conn.open(options);
}

{
	// token
	let options = {
		apiUrl: WebIM.config.apiURL,
		user: 'username',
		accessToken: 'token',
		appKey: WebIM.config.appkey
	};
	conn.open(options);
}

// 退出·
conn.close();
