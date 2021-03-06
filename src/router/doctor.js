import {commonRoute} from "./common";

import DoctorIndex from "../containers/doctor/DoctorIndex/DoctorIndex";
import PersonalDoctor from "../containers/doctor/DoctorPersonal/PersonalDoctor";
import NewPatient from "../containers/doctor/NewPatient/NewPatient";
import DoctorCompleteInformation from "../containers/doctor/CompleteInformation/DoctorCompleteInformation";
import DoctorDetail from "../containers/doctor/DoctorDetail/DoctorDetail";
import DoctorWallet from "../containers/doctor/Wallet/DoctorWallet";
import PatientDetail from "../containers/doctor/PatientDetail/PatientDetail";
import Statistics from "../containers/doctor/Statistics/Statistics";
import MyHelper from "../containers/doctor/MyHelper/MyHelper";
import Publish from "../containers/doctor/Publish/Publish";
import PublishSelectSort from "../containers/doctor/PublishSelectSort/PublishSelectSort";
import PublishPersonSelect from "../containers/doctor/PublishPersonSelect/PublishPersonSelect";
import PublishPreview from "../containers/doctor/PublishPreview/PublishPreview";
import Published from "../containers/doctor/Published/Published";
import PatientRemark from "../containers/doctor/PatientRemark/PatientRemark";
import DoctorList from "../containers/doctor/DoctorList/DoctorList";
import InviteDoctorList from '../containers/doctor/InviteDoctorList/InviteDoctorList'
import InvitePatientList from '../containers/doctor/InvitePatientList/InvitePatientList'

export const doctorNav = [
	{
		pathname: '/doctor-index',
		path: '我的患者',
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
	...commonRoute,
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
		pathname: '/doctor-wallet',
		component: DoctorWallet
	},
	{
		pathname: '/patient-detail/:patientId',
		component: PatientDetail
	},
	{
		pathname: '/statistics',
		component: Statistics
	},
	{
		pathname: '/my-help',
		component: MyHelper
	},
	{
		pathname: '/publish',
		component: Publish
	},
	{
		pathname: '/published',
		component: Published
	},
	{
		pathname: '/publish-select-sort',
		component: PublishSelectSort
	},
	{
		pathname: '/publish-person-select/:label_id',
		component: PublishPersonSelect
	},
	{
		pathname: '/publish-preview',
		component: PublishPreview
	},
	{
		pathname: '/patient-remark/:patientId',
		component: PatientRemark
	},
	{
		pathname: '/doctor-list/:only_no',
		component: DoctorList
	},
	{
		pathname: '/invite-doctor-list',
		component: InviteDoctorList
	},
	{
		pathname: '/invite-patient-list',
		component: InvitePatientList
	}
];
