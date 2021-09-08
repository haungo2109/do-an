import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import UserScreen from './UserScreen';
import WellcomeScreen from './WellcomeScreem';

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
		name: 'Profile',
		component: UserScreen,
		options: { headerShown: false },
	},
	{
		name: 'Login',
		component: LoginScreen,
		options: { headerShown: false },
	},
	{
		name: 'Register',
		component: RegisterScreen,
		options: { headerShown: false },
	},
];

export default navigator;
