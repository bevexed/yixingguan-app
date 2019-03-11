import Message from "../containers/common/Message/Message";
import Avatar from "../containers/doctor/Avatar/Avatar";

export const commonRoute = [
	{
		pathname: '/message/:to',
		component: Message,
	},
	{
		pathname:'/avatar',
		component:Avatar
	}
];

