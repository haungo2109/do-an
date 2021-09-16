import React from 'react';
import Feed from './Feed';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../config/Colors';
import useModelMenu from '../hooks/useModelMenu.js';
import { useNavigation } from '@react-navigation/native';
import { fetchPostComment } from '../redux/reducers/commentReducer';

const WrapperList = styled.View`
	background-color: ${Colors.gray2};
	flex: 1;
`;

function ListFeed(props) {
	const dispatch = useDispatch();
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
	const navigatePostDetail = async (index, id) => {
		await dispatch(fetchPostComment(id));
		navigation.navigate('PostDetail', { postIndex: index });
	};
	return (
		<>
			<WrapperList>
				{data.length !== 0 &&
					data.map((c, index) => (
						<Feed
							key={c.id}
							{...c}
							handlePressMenu={handlePressMenu}
							isLike={checkLiked(c.like)}
							goPostDetail={navigatePostDetail}
							index={index}
						/>
					))}
				{loading && <ActivityIndicator size="large" color="#0000ff" />}
			</WrapperList>
		</>
	);
}

export default ListFeed;
