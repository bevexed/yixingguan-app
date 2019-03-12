import ajax from "../ajax";

import Cookie from 'js-cookie';

const token = Cookie.get('token');

// 获取标签
export const reqLabelList = () => ajax('/api/doctor/list/label_lists', {token});

// 添加 标签
export const reqAddLabel = ({id, label, new_label}) => ajax('/api/doctor/list/add_labels', {id, token, label, new_label});

// 医生提交资料API
export const reqDoctorInformation = ({avatar, birth, sex, affiliated_hospital, department, with_title, vocational_certificate, introduction}) => ajax('/api/doctor/personal/perfect_information', {token, avatar, birth, sex, affiliated_hospital, department, with_title, vocational_certificate, introduction});

// 患者列表
export const reqPatientList = () => ajax('/api/doctor/list/patient_lists', {token});

// 患者详情
export const reqPatientDetail = id => ajax('/api/doctor/list/patient_details', {id, token});

// 接收患者
export const reqAcceptPatients = id => ajax('/api/doctor/list/accept_patients', {id, token});

// 医生资金
export const reqExceptionalAccount = () => ajax('/api/doctor/account/exceptional_accounts', {token});

// 医生资金日志
export const reqExceptionalLogs = page => ajax('/api/doctor/account/exceptional_logs', {token, page});

// 医生获取助手
export const reqAssistantList = () => ajax('/api/doctor/list/assistant_list', {token});

// 获取医生统计 数据 API
export const reqDataAnalysis = ({start_time, end_time}) => ajax('/api/doctor/account/data_analysis', {token, start_time, end_time});

// 发布文章
export const reqReleaseShare = ({contents, picture, is_open, allow_users}) => ajax('/api/doctor/share/release_share', {contents, picture, is_open, allow_users});

// 医生获取所发文章列表
export const reqShareLists = page => ajax('/api/doctor/share/share_lists', {token, page}, 'GET');

// 文章详情
export const reqShareDetail = id => ajax('/api/doctor/share/share_detail', {id});

// 医生删除助手
export const reqAssistantDelete = id => ajax('/api/doctor/list/assistant_delete',{id});

// 医生删除预约
export const reqSubscribeDelete = id => ajax('/api/doctor/list/subscribe_delete',{id});
