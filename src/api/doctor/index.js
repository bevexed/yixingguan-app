import ajax from "../ajax";

// 获取标签
export const reqLabelList = token => ajax('/api/doctor/list/label_lists', {token});

// 添加 标签
export const reqAddLabel = ({id, token, label}) => ajax('/api/doctor/list/add_labels', {id, token, label});

// 医生提交资料API
export const reqDoctorInformation = ({token, avatar, birth, sex, affiliated_hospital, department, with_title, vocational_certificate, introduction}) => ajax('/api/doctor/personal/perfect_information', {token, avatar, birth, sex, affiliated_hospital, department, with_title, vocational_certificate, introduction});

// 患者列表
export const reqPatientList = token => ajax('/api/doctor/list/patient_lists', {token});

// 患者详情
export const reqPatientDetail = ({id, token}) => ajax('/api/doctor/list/patient_details', {id, token});

// 接收患者
export const reqAcceptPatients = ({id, token}) => ajax('/api/doctor/list/accept_patients', {id, token});

// 医生资金
export const reqExceptionalAccount = token =>ajax('/api/doctor/account/exceptional_accounts',{token});
