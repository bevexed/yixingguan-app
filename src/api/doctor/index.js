import ajax from "../ajax";

import Cookie from 'js-cookie';

const token = Cookie.get('token');

// 新郑 标签
export const reqAddLabel = ({id, token, label}) => ajax('/api/doctor/list/add_labels', {id, token, label});

// 医生提交资料API
export const reqDoctorInformation = ({token, avatar, birth, sex, affiliated_hospital, department, with_title, vocational_certificate, introduction}) => ajax('/api/doctor/personal/perfect_information', {token, avatar, birth, sex, affiliated_hospital, department, with_title, vocational_certificate, introduction});

// 患者列表
export const reqPatientList = token => ajax('/api/doctor/list/patient_lists',{token});
