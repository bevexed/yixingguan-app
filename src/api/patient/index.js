import ajax from '../ajax'

export const reqBanner = () => ajax('/api/patient/home/banners');


// |参数名					|必选  |类型			| 说明
// |locating_city |是    |string  | 定位城市
// |city          |否    |string  | 选择的城市
// |department    |否    |string  | 选择的科室
// |page     			|是    |string  | 页数
export const reqDoctorList = ({locating_city, page, city, department}) => ajax('/api/patient/home/doctor_lists', {locating_city, page, city, department}, 'GET');

export const reqDoctorDetail = id => ajax('/api/patient/home/doctor_details', {id});

export const reqSeeks = title => ajax('/api/patient/home/seeks', {title}, 'POST');
