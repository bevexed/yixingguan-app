import WechatJSSDK from 'wechat-jssdk/dist/client';

import {dev} from './api/config';

const config = {
	//前4个是微信验证签名必须的参数，第2-4个参数为类似上面 '/get-signature' 从node端获取的结果
	'appId': dev.appId,
	'nonceStr': 'xxx',
	'signature': 'xxx',
	'timestamp': 'xxx',
	//下面为可选参数
	'debug': true, //开启 debug 模式
	'jsApiList': [], //设置所有想要使用的微信jsapi列表, 默认值为 ['onMenuShareTimeline', 'onMenuShareAppMessage']，分享到朋友圈及聊天记录
	'customUrl': '' //自定义微信js链接
};

const wechatObj = new WechatJSSDK(config);
export const a = wechatObj.initialize()
	.then(w => {
		console.log(w);
		//set up your share info, "w" is the same instance as "wechatObj"
	})
	.catch(err => {
		console.error(err);
	});


