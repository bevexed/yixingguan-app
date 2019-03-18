require('../../static/strophe.js');
const WebIM = require('easemob-websdk');
// require('easemob-websdk/dist/strophe-1.2.8.min');
WebIM.config = require('../../webim.config').config;

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

// export const register_chat = () => {
// 	let options = {
// 		username: '123ewqweqweqwewqewqeqwewewqeqwewq',
// 		password: '123jshdashd',
// 		nickname: '1123',
// 		appKey: WebIM.config.appkey,
// 		success: function (res) {
// 			console.log(res);
// 		},
// 		error: function (err) {
// 			console.log(err);
// 		},
// 		apiUrl: WebIM.config.apiURL
// 	};
// 	conn.registerUser(options);
// };

export const open_chat = (user,pwd) => {
	let options = {
		apiUrl: WebIM.config.apiURL,
		user ,
		pwd,
		appKey: WebIM.config.appkey,
		success: function (res) {
			console.log(res);
		},
		error: function (err) {
			console.log(err);
		},
	};
	conn.open(options);
};

export const listen = () => {
	conn.listen({
		onOpened(message) {          //连接成功回调
			// 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
			// 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
			// 则无需调用conn.setPresence();
			console.log('open',message);
		},
		onClosed(message) {
			console.log('onclosed',message);
		},         //连接关闭回调
		onTextMessage(message) {
			console.log('text', message);
		},    //收到文本消息
		onEmojiMessage(message) {
			console.log('emoji', message);
		},   //收到表情消息
		onPictureMessage(message) {
			console.log('pic', message);
		}, //收到图片消息
		onCmdMessage(message) {
			console.log('cmd', message);
		},     //收到命令消息
		onAudioMessage(message) {
			console.log('audio', message);
		},   //收到音频消息
		onLocationMessage(message) {
			console.log('location', message);
		},//收到位置消息
		onFileMessage(message) {
			console.log('file', message);
		},    //收到文件消息
		onVideoMessage(message) {
			let node = document.getElementById('privateVideo');
			let option = {
				url: message.url,
				headers: {
					'Accept': 'audio/mp4'
				},
				onFileDownloadComplete(response) {
					node.src = WebIM.utils.parseDownloadResponse.call(conn, response);
				},
				onFileDownloadError() {
					console.log('File down load error.')
				}
			};
			WebIM.utils.download.call(conn, option);
		},   //收到视频消息
		onPresence(message) {
			console.log('presence', message);
		},       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
		onRoster(message) {
		},         //处理好友申请
		onInviteMessage(message) {
		},  //处理群组邀请
		onOnline() {
			console.log('链接成功');
		},                  //本机网络连接成功
		onOffline() {
			console.log('掉线');
		},                 //本机网络掉线
		onError(message) {
			console.log('onError:'+message);
		},          //失败回调
		onBlacklistUpdate(list) {       //黑名单变动
			// 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
			console.log(list);
		},
		onReceivedMessage(message) {
			console.log('receive',message);
		},    //收到消息送达服务器回执
		onDeliveredMessage(message) {
			console.log('deliver',message);
		},   //收到消息送达客户端回执
		onReadMessage(message) {
		},        //收到消息已读回执
		onCreateGroup(message) {
		},        //创建群组成功回执（需调用createGroupNew）
		onMutedMessage(message) {
		}        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
	});
};

listen();
