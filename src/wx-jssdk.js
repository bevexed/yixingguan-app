import wx from 'weixin-js-sdk';

import {reqWxConfig, reqWxPay} from "./api";

export const getWxConfig = async () => {
	let url = window.location.href.split('#')[0];
	let result = await reqWxConfig(url);
	result = result.data;
	console.log(result);
	let jssdkconfig = result;

	wx.config({
		debug: false,
		appId: jssdkconfig.appId,
		timestamp: jssdkconfig.timestamp,
		nonceStr: jssdkconfig.nonceStr,
		signature: jssdkconfig.signature,
		jsApiList: [
			'getLocation',
			'chooseWXPay',
			'openLocation',
			'onMenuShareTimeline',
			'onMenuShareAppMessage'
		]
	});
	wx.error(function (res) {
		console.log(`err:${JSON.stringify(res)}`)
	});
};

export const wxPay = ({chat_room, money}) => {
	reqWxPay({chat_room, money})
		.then(
			res => {
				let result = res.data;
				wx.chooseWXPay({
					appId: result.appid,
					// appId: 'wx6ae88e9a0dcb59b1',
					timestamp: result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: result.noncestr, // 支付签名随机串，不长于 32 位
					package: result.prepayid, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
					signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: result.sign, // 支付签名
					success: function (res) {
						// 支付成功后的回调函数
						if (res.errMsg === "chooseWXPay:ok") {
							//支付成功
							console.log('success', res);
						} else {
							console.log('err', res);
						}
					},
					cancel: function (res) {
						//支付取消
						that.$message({
							message: "您已取消支付"
						})
					}
				});
			}
		)
};
