import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigator from './app/screens';
import { store, persistor } from './app/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

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

export default function App() {
	const loadNavigator = (screens = []) => {
		return screens.map((c, i) => <Stack.Screen {...c} key={i} />);
	};
	return (
		<Provider store={store}>
			<PersistGate loading={<LoadingMarkup />} persistor={persistor}>
				<View>
					<StatusBar
						backgroundColor="#FFFFFF"
						barStyle="dark-content"
					/>
					<NavigationContainer>
						<Stack.Navigator initialRouteName="Login">
							{loadNavigator(navigator)}
						</Stack.Navigator>
					</NavigationContainer>
				</View>
			</PersistGate>
		</Provider>
	);
}
