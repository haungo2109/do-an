import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import AppBar from '../components/AppBar';
import ListFeed from '../components/ListFeed';
import ToolBar from '../components/ToolBar';
import Users from '../components/Users';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrenUserAction } from '../redux/reducers/userReducer';
import { getAllPostAction } from '../redux/reducers/postReducer';

const Container = styled.SafeAreaView`
	flex: 1;
`;

function HomeScreen(props) {
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await dispatch(getAllPostAction());
		setRefreshing(false);
	}, []);

	useEffect(() => {
		dispatch(getCurrenUserAction());
		dispatch(getAllPostAction());
	}, []);

	return (
		<>
			<Container>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				>
					<ToolBar />
					<Users />
					<ListFeed />
				</ScrollView>
			</Container>
		</>
	);
}

export default HomeScreen;
