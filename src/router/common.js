import Message from "../containers/Message/Message";
import Avatar from "../containers/Avatar/Avatar";

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

