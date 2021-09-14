import React from 'react';
import Feed from 'components/Feed';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../config/Colors';
import { setControllerMenu } from '../redux/reducers/controllerReducer';
import useModelMenu from '../hooks/useModelMenu.js';
import { useNavigation } from '@react-navigation/native';

const WrapperList = styled.View`
	background-color: ${Colors.gray2};
	flex: 1;
`;

function ListFeed(props) {
	const user = useSelector((state) => state.user);
	const { data, loading } = useSelector((state) => state.post);
	const { showModelMenu } = useModelMenu();
	const navigation = useNavigation();

	const handlePressMenu = (uid, post) => {
		if (user.id === uid)
			showModelMenu({
				id: post.id,
				listChoose: ['edit', 'delete'],
				data: post,
			});
		else showModelMenu({ id: post.id, listChoose: ['report'], data: post });
	};
	const checkLiked = (like = []) => {
		if (user) {
			return like.includes(user.id);
		}
		return false;
	};
	const navigatePostDetail = (data = {}) => {
		navigation.navigate('PostDetail', data);
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
							isLike={checkLiked(c.like)}
							goPostDetail={navigatePostDetail}
						/>
					))}
				{loading && <ActivityIndicator size="large" color="#0000ff" />}
			</WrapperList>
		</>
	);
}

export default ListFeed;
