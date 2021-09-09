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
import ModelMenu from '../components/ModelMenu';
import ModelEdit from '../components/ModelEdit';

const Container = styled.SafeAreaView`
	flex: 1;
`;
const WrapperModel = styled.View`
	flex: 1;
	top: 0;
	left: 0;
	position: absolute;
	height: 100%;
	width: 100%;
`;
function HomeScreen(props) {
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await dispatch(getAllPostAction());
		setRefreshing(false);
	}, []);

	useEffect(() => {
		if (!user?.username) dispatch(getCurrenUserAction());
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
					<AppBar />
					<ToolBar />
					<Users />
					<ListFeed />
				</ScrollView>
			</Container>
			<WrapperModel>
				<ModelMenu />
				<ModelEdit />
			</WrapperModel>
		</>
	);
}

export default HomeScreen;
