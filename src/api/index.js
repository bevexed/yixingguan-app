import ajax from './ajax'

import {dev} from './config.js'

const {appID, redirect_uri, scope} = dev.wx;

export const reqCode = (state) => window.location.assign(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`);
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6ad3262297242b11&redirect_uri=\u0034\u0037\u002e\u0037\u0035\u002e\u0037\u0034\u002e\u0038\u0039&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect

export const reqToken = (code,only_no,assistant) => ajax( '/api/wx/get_token', {code,only_no,assistant}, 'GET');

export const doLogin = ({identity, name}) => ajax('/api/login/modify_the', {identity, name});

export const checkCode = ({phone, auto_code}) => ajax('/api/login/do_login', {phone, auto_code});

export const reqUserData = token => ajax('/api/login/get_user', {token});

// 发送短信
export const reqSendMessage = ({mobile, template_id_code = 2}) => ajax('/api/send_message', {mobile, template_id_code});

// 协议
export const reqArticleBrief = () => ajax('/api/article_brief');

// 获取城市
export const reqGetCity = () => ajax('/api/get_city');

// 获取科室
export const reqGetDepartments = () => ajax('/api/get_departments');

// 通过聊天室获取聊天室成员信息
export const reqChatUserInfo = chat_room => ajax('/api/chat/chat_user_info',{chat_room});

