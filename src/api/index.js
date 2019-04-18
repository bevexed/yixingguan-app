import ajax from './ajax'

import {dev} from './config.js'

const {appID, redirect_uri, scope} = dev.wx;

export const reqCode = (state) => window.location.assign(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`);
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6ad3262297242b11&redirect_uri=\u0034\u0037\u002e\u0037\u0035\u002e\u0037\u0034\u002e\u0038\u0039&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect

export const reqToken = (code, only_no, assistant) => ajax('/api/wx/get_token', {code, only_no, assistant}, 'GET');

export const doLogin = ({identity, name}) => ajax('/api/login/modify_the', {identity, name});

export const checkCode = ({phone, auto_code}) => ajax('/api/login/do_login', {phone, auto_code});

export const reqUserData = token => ajax('/api/login/get_user', {token});

// 发送短信
export const reqSendMessage = ({mobile, template_id_code: type}) => ajax('/api/send_message', {mobile, type});

// 协议
export const reqArticleBrief = () => ajax('/api/article_brief');

// 获取城市
export const reqGetCity = () => ajax('/api/get_city');

// 获取科室
export const reqGetDepartments = () => ajax('/api/get_departments');

// 通过聊天室获取聊天室成员信息
export const reqChatUserInfo = chat_room => ajax('/api/chat/chat_user_info', {chat_room});

// 医患 删除关系
export const reqDelete = chat_room => ajax('/api/relation/delete', {chat_room});

// 消息通知
export const reqNotification = ({only_no, url, chat_room}) => ajax('/api/relation/notification', {only_no, url, chat_room});

// wx jssdk
export const reqWxConfig = url => ajax('/api/wx/permission_to_verify', {url}, 'GET');

// wx pay
export const reqWxPay = ({chat_room, money}) => ajax('/api/pay/wx_pay', {chat_room, money});

// 获取logo
export const reqLogo = () => ajax('/api/get_logo');

// 获取软件许可及服务协议
export const reqSoftwareLicense = () => ajax('/api/software_license');

// 获取预约就医服务细则
export const reqServiceDetails = () => ajax('/api/service_details');
