import ajax from "../ajax";

// 新郑 标签
export const reqAddLabel = ({id,token,label}) => ajax('/api/doctor/list/add_labels',{id,token,label});

// 医生提交资料API
export const reqDoctorInformation = ({token,avatar,birth,sex,affiliated_hospital,department,with_title}) => ajax('/api/doctor/personal/perfect_information',{token,avatar,birth,sex,affiliated_hospital,department,with_title});
