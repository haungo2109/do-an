import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { baseURL } from '../api/apiClient';
import AvatarToProfile from '../components/Avatar';
import Feed from '../components/Feed';
import Colors from '../config/Colors';
import Font from '../config/Font';
import useModelMenu from '../hooks/useModelMenu';
import { fetchComment } from '../redux/reducers/commentReducer';

const WrapperComment = styled.View`
	padding: 0px 11px;
`;
const ItemComment = styled.View`
	flex-direction: row;
	height: 42px;
	width: 100%;
	align-items: center;
	margin: 5px 0;
`;
const ItemCommentReply = styled(ItemComment)`
	padding-left: 10%;
`;
const CommentText = styled.Text`
	flex: 1;
	font-size: ${Font.nomal};
	border-radius: 8px;
	height: 100%;
	padding: 5px;
	margin-left: 8px 0;
	background-color: ${Colors.gray2};
`;

function PostDetailScreen({ route, navigation }) {
	const dispatch = useDispatch();
	const item = route.params;
	const { data } = useSelector((state) => state.comment);
	const { showModelMenu } = useModelMenu();

	useEffect(() => {
		dispatch(fetchComment(item.id));
	}, []);

	const handlePressMenu = (uid, post) => {
		// if (user.id === uid)
		// 	showModelMenu({
		// 		id: post.id,
		// 		listChoose: ['edit', 'delete'],
		// 		data: post,
		// 	});
		// else showModelMenu({ id: post.id, listChoose: ['report'], data: post });
	};

	return (
		<ScrollView>
			<Feed {...item} handlePressMenu={handlePressMenu} />
			<WrapperComment>
				{data?.length !== 0 ? (
					data.map((c) => <Item {...c} key={c.id} />)
				) : (
					<ActivityIndicator size="large" color="#0000ff" />
				)}
			</WrapperComment>
		</ScrollView>
	);
}

const Item = (c) => {
	return (
		<ItemComment>
			<AvatarToProfile
				source={{
					uri: baseURL + c.user.avatar,
				}}
			/>
			<CommentText>{c.content}</CommentText>
		</ItemComment>
	);
};

export default PostDetailScreen;
