import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import {user} from './user/reducer'
import {doctorList, doctorDetail} from './patient/reducer'
import {patientList,patientDetail,labelList} from "./doctor/reducer";
import {article_content,article_img,whoCanSee} from "./publish/reducer";

const reducers = combineReducers({
	user,
	doctorList,
	doctorDetail,
	patientList,
	patientDetail,
	labelList,
	article_content,
	article_img,
	whoCanSee
});

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

