import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import UserScreen from './UserScreen';
import WellcomeScreen from './WellcomeScreen';
import ChatScreen from './ChatScreen';
import PostDetailScreen from './PostDetailScreen';

const navigator = [
	{
		name: 'Wellcome',
		component: WellcomeScreen,
		options: { headerShown: false },
	},
	{
		name: 'Home',
		component: HomeScreen,
		options: { headerShown: false },
	},
	{
		name: 'User',
		component: UserScreen,
		// options: { headerShown: false },
	},
	{
		name: 'Chat',
		component: ChatScreen,
		// options: { headerShown: false },
	},
	{
		name: 'Login',
		component: LoginScreen,
		// options: { headerShown: false },
	},
	{
		name: 'Register',
		component: RegisterScreen,
		// options: { headerShown: false },
	},
	{
		name: 'PostDetail',
		component: PostDetailScreen,
		// options: { headerShown: false },
	},
];

export default navigator;
