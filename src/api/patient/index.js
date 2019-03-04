import ajax from '../ajax'

export const reqBanner = () => ajax('/api/patient/home/banners');

export const reqDoctorList = ({locating_city, page, city, department}) => ajax('/api/patient/home/doctor_lists', {locating_city, page, city, department}, 'GET');

export const reqDoctorDetail = id => ajax('/api/patient/home/doctor_details', {id});

export const reqSeeks = title => ajax('/api/patient/home/seeks', {title}, 'POST');

export const subscribes = ({token, d_id, phone, auth_code, symptoms_described, inspection_report}) => ajax('/api/patient/appoint/subscribes', {token, d_id, phone, auth_code, symptoms_described, inspection_report});
