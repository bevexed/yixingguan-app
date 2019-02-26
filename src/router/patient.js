import {commonRoute} from "./common";

import PatientIndex from "../containers/Index/PatientIndex";
import Doctors from "../containers/Doctors/Doctors";
import PersonalPatient from "../containers/Personal/PersonalPatient";
import OrderDoc from "../containers/OrderDoc/OrderDoc";
import Tips from "../containers/Tips/Tips";
import PaySuccess from "../containers/PaySuccess/PaySuccess";

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
		pathname: '/doc',
		path: '',
		isActive: false,
		icon: 'doc.svg',
		selectedIcon: 'doc.svg',
		component: Doctors,
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
		pathname: '/order-doc/:docId',
		component: OrderDoc,
	},
	{
		pathname:'/tips/:docId',
		component:Tips
	},
	{
		pathname:'/pay-success/:money',
		component:PaySuccess
	}
];
