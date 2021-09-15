import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store, persistor } from './app/redux/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';
import ModelEdit from './app/components/ModelEdit';
import ModelMenu from './app/components/ModelMenu';
import ModelImageSelection from './app/components/ModelImageSelection';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import UserScreen from './app/screens/UserScreen';
import WellcomeScreen from './app/screens/WellcomeScreen';
import ChatScreen from './app/screens/ChatScreen';
import PostDetailScreen from './app/screens/PostDetailScreen';
import AppBar from './app/components/AppBar';
import { logoutAction } from './app/redux/actions';
import { removeAll } from './app/utils/AsyncStorage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const WrapperModel = styled.View`
	flex: 1;
	top: 0;
	left: 0;
	position: absolute;
	height: 100%;
	width: 100%;
`;
const LoadingMarkup = () => (
	<View
		style={{
			flex: 1,
			justifyContent: 'center',
		}}
	>
		<ActivityIndicator size="large" color="#0000ff" />
	</View>
);

const HomeStack = (props) => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{ headerTitle: () => <AppBar {...props} /> }}
			/>
			<Stack.Screen name="User" component={UserScreen} />
			<Stack.Screen name="PostDetail" component={PostDetailScreen} />
		</Stack.Navigator>
	);
};
function CustomDrawerContent(props) {
	const dispatch = useDispatch();
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem
				label="Logout"
				onPress={() => {
					dispatch(logoutAction());
					removeAll();
					props.navigation.navigate('Wellcome');
				}}
			/>
		</DrawerContentScrollView>
	);
}
const AppDrawer = () => {
	return (
		<Drawer.Navigator
			initialRouteName="HomeStack"
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen
				name="HomeStack"
				component={HomeStack}
				options={{ headerShown: false }}
			/>
			<Drawer.Screen
				name="Chat"
				component={ChatScreen}
				options={{ headerShown: false }}
			/>
		</Drawer.Navigator>
	);
};

const AppContainer = () => {
	const user = useSelector((state) => state.user);
	return (
		<Stack.Navigator initialRouteName={user ? 'App' : 'Wellcome'}>
			<Stack.Screen
				name="Wellcome"
				component={WellcomeScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
			<Stack.Screen
				name="App"
				component={AppDrawer}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={<LoadingMarkup />} persistor={persistor}>
				<StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
				<NavigationContainer>
					<AppContainer />
				</NavigationContainer>
				<WrapperModel>
					<ModelMenu />
					<ModelEdit />
					<ModelImageSelection />
				</WrapperModel>
			</PersistGate>
		</Provider>
	);
}
