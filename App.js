import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store, persistor } from './app/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';
import ModelEdit from './app/components/ModelEdit';
import ModelMenu from './app/components/ModelMenu';
import ModelImageSelection from './app/components/ModelImageSelection';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import UserScreen from './app/screens/UserScreen';
import WellcomeScreen from './app/screens/WellcomeScreen';
import ChatScreen from './app/screens/ChatScreen';
import PostDetailScreen from './app/screens/PostDetailScreen';
import AppBar from './app/components/AppBar';

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

const AppDrawer = () => {
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen
				name="Home"
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

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={<LoadingMarkup />} persistor={persistor}>
				<StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Wellcome">
						<Stack.Screen
							name="Wellcome"
							component={WellcomeScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen
							name="Register"
							component={RegisterScreen}
						/>
						<Stack.Screen
							name="App"
							component={AppDrawer}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
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
