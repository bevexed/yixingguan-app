import {
	reqDoctorInformation
} from "../../api/doctor";

import {
	UPDATA_DOCTOR_INFORMATION
} from "../action-types";

const getDoctorInformation = (DoctorData)=>({type:UPDATA_DOCTOR_INFORMATION,data:DoctorData});

export const updataDoctorInformation = (DotorData) => {
	return async dispatch => {
		reqDoctorInformation({...DotorData}).then(
			res=>{
				console.log(res);
				dispatch(getDoctorInformation(res))
			}
		)
	}
};
