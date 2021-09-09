import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import Colors from '../config/Colors';
import { useDispatch, useSelector } from 'react-redux';
import Font from '../config/Font';
import useModelEdit from '../hooks/useModelEdit';
import { Platform } from 'react-native';
import ImageInput from './ImageInput';
import { baseURL } from '../api/apiClient';
import { postPostAction } from '../redux/reducers/postReducer';
import postApi from '../api/postApi';
import { resetDataModelEdit } from '../redux/reducers/controllerReducer';

const Row = styled.View`
	flex-direction: row;
	justify-content: center;
`;
const ButtonClose = styled.TouchableWithoutFeedback`
	border-radius: 10px;
	background-color: ${Colors.gray9};
`;
const TextTitle = styled.Text`
	font-size: ${Font.bigger};
	color: ${Colors.gray8};
	font-weight: bold;
	margin-bottom: 20px;
`;
const FormView = styled.View`
	position: relative;
	width: 95%;
	justify-content: center;
	align-items: center;
	padding: 20px 10px;
	background-color: ${Colors.gray1};
	border-radius: 10px;
`;
const Container = styled.View`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.gray6o5};
`;
const TextInput = styled.TextInput`
	color: ${Colors.gray7};
	font-weight: bold;
`;
const Icon = styled.View`
	margin-right: 10px;
`;
const Field = styled.View`
	height: 50px;
	width: 95%;
	flex-direction: row;
	border-radius: 10px;
	align-items: center;
	padding-left: 10px;
	margin-bottom: 3px;
	background: ${Colors.gray2};
`;
const FieldImage = styled(Field)`
	height: 150px;
`;
const SubmitButton = styled.TouchableOpacity`
	height: 50px;
	width: 95%;
	flex-direction: row;
	border-radius: 10px;
	align-items: center;
	padding-left: 10px;
	margin-bottom: 3px;
	justify-content: center;
	margin-top: 10px;
	background-color: ${Colors.facebookColor};
`;
const TextSubmitButton = styled.Text`
	color: ${Colors.gray2};
	font-weight: bold;
`;
const ErrorText = styled.Text`
	color: #f97316;
	font-size: 12px;
`;
const ModelEdit = () => {
	const dispatch = useDispatch();
	const { id, show, listChoose, title, data } = useSelector(
		(state) => state.controller.editPost
	);
	const { error } = useSelector((state) => state.post);
	const { hiddenModelEdit } = useModelEdit();
	const [content, setContent] = useState(data?.content || '');
	const [hashtag, setHashtag] = useState(
		(data?.hashtag?.length && data.hashtag.map((c) => c.name).join(',')) ||
			''
	);
	const [photo, setPhoto] = useState(
		(data?.post_images?.length &&
			data.post_images.map((c) => ({ uri: baseURL + c }))) ||
			null
	);

	const listButton = {
		content: (
			<Field>
				<Icon>
					<FontAwesome name="pencil" size={25} color={Colors.gray6} />
				</Icon>
				<TextInput
					multiline={true}
					numberOfLines={5}
					onChangeText={setContent}
					value={content}
					placeholder="Nhập nội dung bài viết"
				/>
			</Field>
		),
		hashtag: (
			<Field>
				<Icon>
					<FontAwesome
						name="hashtag"
						size={25}
						color={Colors.gray6}
					/>
				</Icon>
				<TextInput
					onChangeText={setHashtag}
					value={hashtag}
					placeholder="Thêm hashtag"
				/>
			</Field>
		),
		images: (
			<FieldImage>
				<Icon>
					<FontAwesome name="image" size={24} color={Colors.gray6} />
				</Icon>
				<ImageInput photo={photo} setPhoto={setPhoto} />
			</FieldImage>
		),
	};
	const handleSubmit = () => {
		const data = new FormData();
		if (photo?.length)
			photo.forEach((item, i) => {
				data.append('images', {
					uri:
						Platform.OS === 'ios'
							? item.uri.replace('file://', '')
							: item.uri,
					type:
						'image/' +
						item.uri.slice(item.uri.lastIndexOf('.') + 1),
					name: item.filename || `filename${i}.jpg`,
				});
			});
		if (content) data.append('content', content);
		if (content || photo?.length) return;
		if (hashtag) data.append('hashtag', hashtag);

		dispatch(postPostAction(data)).then(() => {
			hiddenModelEdit();
		});
	};
	if (show)
		return (
			<Container>
				<FormView>
					<Row>
						<TextTitle>{title}</TextTitle>
						<ButtonClose onPress={hiddenModelEdit}>
							<AntDesign
								name="close"
								size={25}
								color={Colors.gray6}
							/>
						</ButtonClose>
					</Row>
					{error != '' && <ErrorText>{error}</ErrorText>}
					{listChoose?.length !== 0 &&
						listChoose.map((c, i) => listButton[c])}
					<SubmitButton onPress={handleSubmit}>
						<TextSubmitButton>ĐĂNG</TextSubmitButton>
					</SubmitButton>
				</FormView>
			</Container>
		);
	else return null;
};

export default ModelEdit;
