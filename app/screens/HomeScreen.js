import React, { useEffect } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import AppBar from '../components/AppBar';
import ListFeed from '../components/ListFeed';
import Story from '../components/Story';
import ToolBar from '../components/ToolBar';
import Users from '../components/Users';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrenUserAction } from '../redux/reducers/userReducer';
import { getAllPostAction } from '../redux/reducers/postReducer';
import ModelMenu from '../components/ModelMenu';

const Container = styled.SafeAreaView`
	flex: 1;
`;

function HomeScreen(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (!user?.username) dispatch(getCurrenUserAction());
		dispatch(getAllPostAction());
	}, []);

	return (
		<>
			<Container>
				<ScrollView>
					<AppBar />
					<ToolBar />
					<Users />
					<ListFeed />
				</ScrollView>
			</Container>
			<ModelMenu />
		</>
	);
}

export default HomeScreen;
