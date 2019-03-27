import Message from "../containers/common/Message/Message";
import Avatar from "../containers/doctor/Avatar/Avatar";
import SearchResult from "../containers/common/SearchResult/SearchResult";


export const commonRoute = [
	{
		pathname: '/message/:to',
		component: Message,
	},
	{
		pathname:'/avatar',
		component:Avatar
	},
	{
		pathname: '/search-result',
		component: SearchResult
	}
];

