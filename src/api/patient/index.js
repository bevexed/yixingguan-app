import ajax from '../ajax'

import Cookie from 'js-cookie';

const token = Cookie.get('token');

// 首页 banner
export const reqBanner = () => ajax('/api/patient/home/banners');

// 请求医生列表
export const reqDoctorList = ({locating_city, page, city, department}) => ajax('/api/patient/home/doctor_lists', {locating_city, page, city, department}, 'GET');

// 医生详情
export const reqDoctorDetail = id => ajax('/api/patient/home/doctor_details', {id});

// 搜索医生
export const reqSeeks = title => ajax('/api/patient/home/seeks', {title}, 'POST');

// 用户预约
export const subscribes = ({name, d_id, phone, auth_code, symptoms_described, inspection_report}) => ajax('/api/patient/appoint/subscribes', {token, name, d_id, phone, auth_code, symptoms_described, inspection_report});

// 用户预约列表
export const reqSubscribeLists = () => ajax('/api/patient/appoint/subscribe_lists', {token});

// 患者端 聊天列表API
export const reqPatientList = () => ajax('/api/patient/chat/patient_lists', {}, 'GET');

// 获取支付金额
export const reqGetPayAmounts = () => ajax('/api/pay/get_pay_amounts');
