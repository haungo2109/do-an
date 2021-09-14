import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigator from './app/screens';
import { store, persistor } from './app/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';
import ModelEdit from './app/components/ModelEdit';
import ModelMenu from './app/components/ModelMenu';
import ModelImageSelection from './app/components/ModelImageSelection';

const Stack = createNativeStackNavigator();
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

export default function App() {
	const loadNavigator = (screens = []) => {
		return screens.map((c, i) => <Stack.Screen {...c} key={i} />);
	};
	return (
		<Provider store={store}>
			<PersistGate loading={<LoadingMarkup />} persistor={persistor}>
				<StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Wellcome">
						{loadNavigator(navigator)}
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
