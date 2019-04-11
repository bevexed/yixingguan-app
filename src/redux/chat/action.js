import {
	DELETE_CHAT,
	// SEND_AUDIO,
	// RECEIVE_AUDIO,
	LOGIN_SUCCESS_CHAT,
	RECEIVE_IMG,
	RECEIVE_TEXT_MESSAGE,
	SEND_IMG,
	SEND_MESSAGE
} from "../action-types";
import {Toast} from "antd-mobile";
import {reqNotification} from "../../api";

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

/*
// 注册

export const register_chat = () => {
	let options = {
		username: '123ewqweqweqwewqewqeqwewewqeqwewq',
		password: '123jshdashd',
		nickname: '1123',
		appKey: WebIM.config.appkey,
		success: function (res) {
			console.log(res);
		},
		error: function (err) {
			console.log(err);
		},
		apiUrl: WebIM.config.apiURL
	};
	conn.registerUser(options);
};
*/


const loginSuccessChat = user => ({type: LOGIN_SUCCESS_CHAT, data: user});
// 登录
export const open_chat = (user, pwd) => {
	return async dispatch => {
		let options = {
			apiUrl: WebIM.config.apiURL,
			user,
			pwd,
			appKey: WebIM.config.appkey,
			success(res) {
				console.log('auth', res);
				dispatch(loginSuccessChat(res));
			},
			error(err) {
				console.log(err);
			},
		};
		conn.open(options);
	}
};

export const receiveTextMessage = msg => ({type: RECEIVE_TEXT_MESSAGE, data: msg});

export const receiveImg = img => ({type: RECEIVE_IMG, data: img});

// 监听
export const listen = ({receiveTextMessage, receiveImg}) => {
	conn.listen({
		onOpened(message) {          //连接成功回调
			// 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
			// 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
			// 则无需调用conn.setPresence();
			console.log('open', message);
		},
		onClosed(message) {
			console.log('onclosed', message);
		},         //连接关闭回调
		onTextMessage(message) {
			console.log(message);
			if (message.error) {
				Toast.fail(message.errorText, 1)
			}
			let msg = {chat_room: message.to, message: message.data, time: new Date().valueOf(), username: message.from};
			receiveTextMessage && receiveTextMessage(msg);
		},    //收到文本消息
		onEmojiMessage(message) {
			console.log('emoji', message);
		},   //收到表情消息
		onPictureMessage(message) {
			if (message.error) {
				Toast.fail(message.errorText, 1)
			}
			let img = {chat_room: message.to, imgUrl: message.url, time: new Date().valueOf(), username: message.from};
			receiveImg && receiveImg(img);
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
			// Toast.fail('您已经掉线', 1, () => {
			// 	window.location.reload(true)
			// });
			console.log('掉线');
		},                 //本机网络掉线
		onError(message) {
			// Toast.fail('链接错误', 1);
			console.log('onError:' + message);
		},          //失败回调
		onBlacklistUpdate(list) {       //黑名单变动
			// 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
			console.log(list);
		},
		onReceivedMessage(message) {
			console.log('receive', message);
		},    //收到消息送达服务器回执
		onDeliveredMessage(message) {
			console.log('deliver', message);
		},   //收到消息送达客户端回执
		onReadMessage(message) {
		},        //收到消息已读回执
		onCreateGroup(message) {
		},        //创建群组成功回执（需调用createGroupNew）
		onMutedMessage(message) {
		}        //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
	});
};


const sendMessage = msg => ({type: SEND_MESSAGE, data: msg});
// 发送群消息
export const sendRoomText = (message, chat_room, username, only_no) => {
	console.log('only_no', only_no);
	return async dispatch => {
		let id = conn.getUniqueId();         // 生成本地消息id
		let msg = new WebIM.message('txt', id); // 创建文本消息
		let option = {
			msg: message,          // 消息内容
			to: chat_room,               // 接收消息对象(聊天室id)
			roomType: false,
			chatType: 'chatRoom',
			success: function () {
				const msg = {chat_room, message, time: new Date().valueOf(), username};
				reqNotification({only_no, chat_room, url: window.location.href});
				dispatch(sendMessage(msg));
				console.log('send room text success');
			},
			fail: function () {
				Toast.fail('发送失败', 1);
				console.log('failed');
			}
		};
		msg.set(option);
		msg.setGroup('groupchat');
		conn.send(msg.body);
	}
};

const sendImg = img => ({type: SEND_IMG, data: img});
export const doSendImg = (chat_room, username, type) => {
	return async dispatch => {
		let imgUrl;
		let id = conn.getUniqueId();                   // 生成本地消息id
		let msg = new WebIM.message('img', id);        // 创建图片消息
		let input = type === 'image' ? document.getElementById('image') : document.getElementById('camera');// 选择图片的input
		console.log('选择图片文件', input);
		let file = WebIM.utils.getFileUrl(input);      // 将图片转化为二进制文件
		console.log('处理过的图片文件', file);
		console.log('图片大小', file.data.size);
		let allowType = {
			'jpg': true,
			'gif': true,
			'png': true,
			'bmp': true
		};
		if (file.filetype.toLowerCase() in allowType || true) {
			let option = {
				apiUrl: WebIM.config.apiURL,
				file,
				to: chat_room,                          // 接收消息对象
				roomType: false,
				chatType: 'chatRoom',
				onFileUploadError: function () {      // 消息上传失败
					Toast.fail('图片上传失败', 1);
					console.log('onFileUploadError');
				},
				onFileUploadComplete: function (res) {   // 消息上传成功
					console.log('onFileUploadComplete', res);
					imgUrl = res.uri + res.entities[0].uuid;
				},
				success: function (res) {                // 消息发送成功
					const img = {chat_room, imgUrl, time: new Date().valueOf(), username};
					dispatch(sendImg(img));
					console.log(img);
					console.log('图片发送Success', res);
				},
				flashUpload: WebIM.flashUpload
			};
			msg.set(option);
			msg.setGroup('groupchat');
			conn.send(msg.body);
		}
	}
};


/* 语音消息功能暂时封存
export const receiveAudio = audio => ({type: RECEIVE_AUDIO, data: audio});
export const sendAudio = audio => ({type: SEND_AUDIO, data: audio});

export const dosendAudio = (img, chat_room, username) => {
	return async dispatch => {
		let id = conn.getUniqueId();                   // 生成本地消息id
		let msg = new WebIM.message('audio', id);      // 创建音频消息
		let input = document.getElementById('audio');  // 选择音频的input
		let file = WebIM.utils.getFileUrl(input);      // 将音频转化为二进制文件
		let allowType = {
			'mp3': true,
			'amr': true,
			'wmv': true
		};
		if (file.filetype.toLowerCase() in allowType) {
			let option = {
				apiUrl: WebIM.config.apiURL,
				file: file,
				to: 'username',                       // 接收消息对象
				roomType: false,
				chatType: 'singleChat',
				onFileUploadError: function () {      // 消息上传失败
					console.log('onFileUploadError');
				},
				onFileUploadComplete: function () {   // 消息上传成功
					console.log('onFileUploadComplete');
				},
				success: function () {                // 消息发送成功
					console.log('Success');
				},
				flashUpload: WebIM.flashUpload
			};
			msg.set(option);
			conn.send(msg.body);
		}
	}
};
*/

export const deleteChat = chat_room => ({type: DELETE_CHAT, data: chat_room});

listen({});

