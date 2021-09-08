import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import AppBar from '../components/AppBar';
import ListFeed from '../components/ListFeed';
import Story from '../components/Story';
import ToolBar from '../components/ToolBar';
import Users from '../components/Users';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
	flex: 1;
`;

function HomeScreen(props) {
	return (
		<>
			<Container>
				<ScrollView>
					<AppBar />
					<ToolBar />
					<Users />
					<Story />
					<ListFeed />
				</ScrollView>
			</Container>
		</>
	);
}

export default HomeScreen;
