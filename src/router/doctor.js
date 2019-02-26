import DoctorIndex from "../containers/Index/DoctorIndex";
import PersonalDoctor from "../containers/Personal/PersonalDoctor";
import NewPatient from "../containers/NewPatient/NewPatient";
import DoctorCompleteInformation from "../containers/CompleteInformation/DoctorCompleteInformation";
import DoctorDetail from "../containers/Detail/DoctorDetail";
import DoctorWallet from "../containers/Wallet/DoctorWallet";

export const doctorNav = [
	{
		pathname: '/doctor-index',
		path: '患者',
		isActive: false,
		icon: 'patient-@3x.png',
		selectedIcon: 'patient-s@3x.png',
		component: DoctorIndex,
		show: true
	},
	{
		pathname: '/doctor-personal',
		path: '我的',
		isActive: false,
		icon: 'my.svg',
		selectedIcon: 'my-s.svg',
		component: PersonalDoctor,
		show: true
	}
];

export const doctorRoute = [
	...doctorNav,
	{
		pathname: '/new-patient',
		component: NewPatient
	},
	{
		pathname: '/doctor-complete-information',
		component: DoctorCompleteInformation
	},
	{
		pathname: '/doctor-detail',
		component: DoctorDetail
	},
	{
		pathname:'/doctor-wallet',
		component: DoctorWallet
	}
];
