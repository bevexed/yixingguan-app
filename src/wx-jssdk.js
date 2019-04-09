import WechatJSSDK from 'wechat-jssdk/dist/client';

import {dev} from './api/config';

import {reqWxConfig, reqWxPay} from "./api";

let wechatObj;

export const getWxConfig = () => {
	let config = {
		//前4个是微信验证签名必须的参数，第2-4个参数为类似上面 '/get-signature' 从node端获取的结果
		'appId': dev.appId,
		'nonceStr': 'xxx',
		'signature': 'xxx',
		'timestamp': 'xxx',
		//下面为可选参数
		'debug': true, //开启 debug 模式
		'jsApiList': ['chooseWXPay'], //设置所有想要使用的微信jsapi列表, 默认值为 ['onMenuShareTimeline', 'onMenuShareAppMessage']，分享到朋友圈及聊天记录
		'customUrl': '' //自定义微信js链接
	};
	const url = window.location.href.split('#')[0].split('?')[0];
	console.log(url);
	reqWxConfig(url)
		.then(
			res => {
				if (res.code === '1') {
					config = {...config, ...res.data};
					wechatObj = new WechatJSSDK(config);
					wechatObj.initialize()
						.then(w => {
							console.log('success', w);
							//set up your share info, "w" is the same instance as "wechatObj"
						})
						.catch(err => {
							console.error('err', err);
						});
				} else {
					console.log(res);
				}
			}
		);
};

export const wxPay = ({chat_room, money}) => {
	reqWxPay({chat_room, money})
		.then(
			res => {
				console.log(wechatObj);
				let config = res.data;
				let pay = {
					appId: config.appid,
					timestamp: config.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: config.noncestr, // 支付签名随机串，不长于 32 位
					package: 'prepay_id=' + config.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
					signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: config.sign, // 支付签名
				};
				console.log('pay', pay);
				console.log(config);
				wechatObj.wx.chooseWXPay({
					...pay,
					success: function (res) {
						console.log(1, res);
						// 支付成功后的回调函数
					},
					fail: function (err) {
						console.log(2, err);
					}
				});

			}
		)
};
