import ajax from './ajax'

export const reqCode = (appId,redirect_uri,scope) => window.location.assign(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`);
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6ad3262297242b11&redirect_uri=\u0034\u0037\u002e\u0037\u0035\u002e\u0037\u0034\u002e\u0038\u0039&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect

export const reqToken = code => ajax('/api/wx/get_token',{code},'GET');

export const doLogin = ({identity,name}) => ajax('/api/login/modify_the',{identity,name});

export const checkCode = ({phone,auto_code}) => ajax('/api/login/do_login',{phone,auto_code});

export const reqUserData = token => ajax('/api/login/get_user',{token});
