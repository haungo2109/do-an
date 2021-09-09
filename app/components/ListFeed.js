import React from 'react';
import Feed from 'components/Feed';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../config/Colors';
import { setControllerMenu } from '../redux/reducers/controllerReducer';
import useModelMenu from '../hooks/useModelMenu.js';

const WrapperList = styled.View`
	background-color: ${Colors.gray2};
	flex: 1;
`;

function ListFeed(props) {
	const user = useSelector((state) => state.user);
	const { data, error, loading } = useSelector((state) => state.post);
	const { showModelMenu } = useModelMenu();

	const handlePressMenu = (uid, postId) => {
		if (user.id === uid) showModelMenu(postId, ['edit', 'delete']);
		else showModelMenu(postId, ['report']);
	};
	const checkLiked = (like = []) => {
		if (user) {
			return like.includes(user.id);
		}
		return false;
	};
	return (
		<>
			<WrapperList>
				{data.length !== 0 &&
					data.map((c) => (
						<Feed
							key={c.id}
							{...c}
							handlePressMenu={handlePressMenu}
							like={checkLiked(c.like)}
						/>
					))}
				{loading && <ActivityIndicator size="large" color="#0000ff" />}
			</WrapperList>
		</>
	);
}

export default ListFeed;
