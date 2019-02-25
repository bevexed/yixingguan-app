import ajax from './ajax'

export const doLogin = ({phone,auto_code,identity,open_id,name}) => ajax('/api/login/do_login',{phone,auto_code,identity,open_id,name});
