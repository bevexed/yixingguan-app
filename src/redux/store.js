import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import {user} from './user/reducers'
import {doctorList, doctorDetail} from './patient/reducers'

const reducers = combineReducers({
	user,
	doctorList,
	doctorDetail
});

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

