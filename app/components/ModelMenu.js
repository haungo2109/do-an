import React from 'react';
import styled from 'styled-components/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Colors from '../config/Colors';

const Container = styled.View`
	flex: 1;
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: ${Colors.gray1};
`;
const Text = styled.Text`
	color: #3a86e9;
	font-weight: bold;
`;
const Row = styled.View`
	flex-direction: row;
    height: 49px;
`;
const Button = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
	background: #eeeeee;
	align-items: center;
	margin-left: 16px;
`;

const ModelMenu = () => {
	const navigation = useNavigation();

	const handleChatButtonPress = () => {
		navigation.navigate('Chat');
	};

	return (
		<Container>
			<Row>
				<Button>
					<Feather name="search" size={29} color="black" />
                    <Text>Delete post</Text>
				</Button>
			</Row>
		</Container>
	);
};

export default ModelMenu;
