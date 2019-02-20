import ajax from './ajax'

export const reqBanner = () => ajax('/api/patient/home/banners');

export const reqDoctorList = () => ajax('/api/patient/home/doctor_lists',{},'GET');
