import Message from "../containers/common/Message/Message";
import Avatar from "../containers/doctor/Avatar/Avatar";
import SearchResult from "../containers/common/SearchResult/SearchResult";
import PublishDetail from "../containers/doctor/PublishDetail/PublishDetail";


export const commonRoute = [
	{
		pathname: '/message/:chat_room',
		component: Message,
	},
	{
		pathname: '/avatar',
		component: Avatar
	},
	{
		pathname: '/search-result',
		component: SearchResult
	},
	{
		pathname: '/publish-detail/:article_id',
		component: PublishDetail
	}
];

