import {commonRoute} from "./common";

import PatientIndex from "../containers/patient/Index/PatientIndex";
import DoctorChatLIst from "../containers/doctor/DoctorChatLIst/DoctorChatLIst";
import PersonalPatient from "../containers/patient/Personal/PersonalPatient";
import OrderDoctor from "../containers/patient/OrderDoctor/OrderDoctor";
import Tips from "../containers/patient/Tips/Tips";
import PaySuccess from "../containers/patient/PaySuccess/PaySuccess";
import RecordList from "../containers/patient/RecordList/RecordList";

export const patientNav = [
	{
		pathname: '/patient-index',
		path: '首页',
		isActive: false,
		icon: 'home.svg',
		selectedIcon: 'home-s.svg',
		component: PatientIndex,
	},
	{
		pathname: '/doctor-chat-list',
		path: '',
		isActive: false,
		icon: 'doc.svg',
		selectedIcon: 'doc.svg',
		component: DoctorChatLIst,
	},
	{
		pathname: '/patient-personal',
		path: '我的',
		isActive: false,
		icon: 'my.svg',
		selectedIcon: 'my-s.svg',
		component: PersonalPatient,
	},
];

export const patientRoute = [
	...patientNav,
	...commonRoute,
	{
		pathname: '/order-doctor/:docId',
		component: OrderDoctor,
	},
	{
		pathname:'/tips/:docId',
		component:Tips
	},
	{
		pathname:'/pay-success/:money',
		component:PaySuccess
	},
	{
		pathname:'/record-list',
		component:RecordList
	}
];
