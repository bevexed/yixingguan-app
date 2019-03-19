import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import {user} from './user/reducer'
import {doctorList, doctorDetail, seekDoctorList} from './patient/reducer'
import {patientList, patientDetail, labelList} from "./doctor/reducer";
import {article_content, article_img, whoCanSee} from "./publish/reducer";
import {chatUser, chatMsg} from "./chat/reducer";

const reducers = combineReducers({
	user,
	doctorList,
	seekDoctorList,
	doctorDetail,
	patientList,
	patientDetail,
	labelList,
	article_content,
	article_img,
	whoCanSee,
	chatUser,
	chatMsg
});

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

