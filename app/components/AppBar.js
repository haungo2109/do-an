import React from 'react';
import styled from 'styled-components/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Colors from '../config/Colors';

const Container = styled.View`
	width: 100%;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
`;
const Text = styled.Text`
	color: ${Colors.facebookColor};
	font-size: 25px;
	font-weight: bold;
	letter-spacing: -0.3px;
`;
const Row = styled.View`
	justify-content: center;
	flex-direction: row;
	margin-right: 16px;
`;
const Button = styled.TouchableOpacity`
	border-radius: 21px;
	background: #eeeeee;
	align-items: center;
	justify-content: center;
	margin-right: 16px;
	padding: 4px;
`;

const AppBar = () => {
	const navigation = useNavigation();

	const handleButton = (to = '') => {
		navigation.navigate(to);
	};

	return (
		<Container>
			<Text>Kanj</Text>
			<Row>
				<Button onPress={() => handleButton('Chat')}>
					<Feather name="search" size={27} color="black" />
				</Button>
			</Row>
		</Container>
	);
};

export default AppBar;
