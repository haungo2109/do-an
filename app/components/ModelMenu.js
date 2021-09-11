import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import {
	Feather,
	MaterialCommunityIcons,
	MaterialIcons,
	AntDesign,
} from '@expo/vector-icons';
import Colors from '../config/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { setControllerMenu } from '../redux/reducers/controllerReducer';
import { deletePostAction } from '../redux/reducers/postReducer';
import useModelEdit from '../hooks/useModelEdit';
import useModelMenu from '../hooks/useModelMenu';
import { baseURL } from '../api/apiClient';

const ViewCheckEven = styled.TouchableWithoutFeedback`
	flex: 1;
`;
const ViewNone = styled.View`
	flex: 1;
	opacity: 0.5;
	background-color: ${Colors.gray6};
`;
const Container = styled.View`
	flex: 1;
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 10px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	background-color: ${Colors.gray1};
`;
const Text = styled.Text`
	color: ${Colors.gray7};
	font-weight: bold;
`;
const Icon = styled.View`
	margin-right: 10px;
`;
const Button = styled.TouchableOpacity`
	height: 50px;
	flex: 1;
	flex-direction: row;
	border-radius: 10px;
	align-items: center;
	padding-left: 10px;
	margin-bottom: 3px;
	background: ${Colors.gray2};
`;

const ModelMenu = () => {
	const dispatch = useDispatch();
	const { showModelEdit } = useModelEdit('Chỉnh sửa bài viết');
	const { hiddenModelMenu } = useModelMenu();

	const { id, show, listChoose, data } = useSelector(
		(state) => state.controller.menuPost
	);

	const listButton = {
		edit: {
			icon: <AntDesign name="edit" size={25} color="black" />,
			text: 'Chỉnh sửa bài viết',
			handle: () => {
				hiddenModelMenu();
				let newData = Object.assign(data, {});
				let hashtag = '';
				let post_images = [];

				if (newData?.hashtag) {
					hashtag = newData.hashtag.map((c) => c.name).join(',');
				}
				if (newData?.post_images) {
					post_images = newData.post_images.map((c) => ({
						uri: baseURL + c,
					}));
				}
				showModelEdit({
					listChoose: ['content', 'hashtag', 'images'],
					id,
					handleSubmit: 'editPost',
					data: { ...newData, hashtag, post_images },
				});
			},
		},
		delete: {
			icon: <AntDesign name="delete" size={25} color="black" />,
			text: 'Xóa bài viết',
			handle: () => {
				dispatch(deletePostAction(id));
				hiddenModelMenu();
			},
		},
		report: {
			icon: <MaterialIcons name="report" size={25} color="black" />,
			text: 'Báo cáo bài viết',
			handle: () => {
				hiddenModelMenu();
			},
		},
	};

	if (show)
		return (
			<>
				<ViewCheckEven onPress={() => hiddenModelMenu(false)}>
					<ViewNone />
				</ViewCheckEven>
				<Container>
					{listChoose &&
						listChoose.map((c, i) => (
							<Button onPress={listButton[c].handle} key={i}>
								<Icon>{listButton[c].icon}</Icon>
								<Text>{listButton[c].text}</Text>
							</Button>
						))}
				</Container>
			</>
		);
	else return null;
};

export default ModelMenu;
