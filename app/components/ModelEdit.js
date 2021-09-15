import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/native';
import {
	Entypo,
	FontAwesome,
	FontAwesome5,
	AntDesign,
} from '@expo/vector-icons';
import Colors from '../config/Colors';
import { useDispatch, useSelector } from 'react-redux';
import Font from '../config/Font';
import useModelEdit from '../hooks/useModelEdit';
import { Alert, Platform } from 'react-native';
import ImageInput from './ImageInput';
import { postPostAction, updatePost } from '../redux/reducers/postReducer';
import { updateCurrenUserAction } from '../redux/reducers/userReducer';

const Row = styled.View`
	width: 95%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;
const WrapperButtonClose = styled.View`
	position: absolute;
	right: 0;
	top: 0;
`;
const ButtonClose = styled.TouchableWithoutFeedback`
	border-radius: 10px;
	background-color: ${Colors.gray9};
`;
const TextTitle = styled.Text`
	font-size: ${Font.bigger};
	color: ${Colors.gray8};
	font-weight: bold;
	margin-bottom: 15px;
`;
const FormView = styled.View`
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
	flex: 1;
	color: ${Colors.gray7};
	font-size: ${Font.big};
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
	height: 42px;
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
	const {
		editPost: { id, show, title, data, handleSubmit },
	} = useSelector((state) => state.controller);
	const { error } = useSelector((state) => state.post);
	const { hiddenModelEdit } = useModelEdit();

	const [input, setInput] = useState({ ...data });

	const handleMultiInput = (name) => {
		return (value) => {
			setInput((preState) => ({ ...preState, [name]: value }));
		};
	};
	useEffect(() => {
		setInput({ ...data });
	}, [data]);

	const mapHandleSubmit = {
		editProfile: () => {
			handleSubmitProfile();
		},
		addPost: () => {
			handelSubmitAddPost();
		},
		editPost: () => {
			handelSubmitEditPost();
		},
	};

	const handleSubmitProfile = () => {
		const { birthday, email, phone, address, first_name, last_name } =
			input;
		const formData = new FormData();
		formData.append('first_name', first_name);
		formData.append('last_name', last_name);
		formData.append('email', email);
		formData.append('birthday', birthday);
		formData.append('phone', phone);
		formData.append('address', address);
		console.log('form submit update profile: ', formData, input);
		dispatch(updateCurrenUserAction({ id, data: formData }))
			.unwrap()
			.then(() => {
				hiddenModelEdit();
			});
	};
	const handelSubmitEditPost = () => {
		const { content, post_images, hashtag } = input;
		const data = new FormData();
		if (post_images?.length && post_images !== data.post_images)
			post_images.forEach((item, i) => {
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
		if (content && content !== data.content)
			data.append('content', content);
		if (hashtag && hashtag !== data.hashtag)
			data.append('hashtag', hashtag);
		console.log('form submit edit post: ', data);
		dispatch(updatePost({ id, data })).then(() => {
			hiddenModelEdit();
		});
	};
	const handelSubmitAddPost = () => {
		const { content, post_images, hashtag } = input;
		const data = new FormData();
		if (post_images.length !== 0)
			post_images.forEach((item, i) => {
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
		if (content !== '') data.append('content', content);
		if (content === '' && post_images.length === 0)
			return Alert.alert(
				'Lưu ý:',
				'Bạn phải có nội dung hoặc hình ảnh để đăng.'
			);
		if (hashtag !== '') data.append('hashtag', hashtag);
		console.log('form submit add post: ', data);
		dispatch(postPostAction(data)).then(() => {
			hiddenModelEdit();
		});
	};
	if (show)
		return (
			<Container>
				<FormView>
					<Row>
						<TextTitle>{title || 'Title'}</TextTitle>
						<WrapperButtonClose>
							<ButtonClose onPress={hiddenModelEdit}>
								<AntDesign
									name="close"
									size={25}
									color={Colors.gray6}
								/>
							</ButtonClose>
						</WrapperButtonClose>
					</Row>
					{error !== undefined && <ErrorText>{error}</ErrorText>}
					{input['content'] !== undefined && (
						<Field>
							<Icon>
								<FontAwesome
									name="pencil"
									size={25}
									color={Colors.gray6}
								/>
							</Icon>
							<TextInput
								multiline={true}
								numberOfLines={5}
								onChangeText={handleMultiInput('content')}
								value={input['content']}
								placeholder="Nhập nội dung bài viết"
							/>
						</Field>
					)}
					{input['hashtag'] !== undefined && (
						<Field>
							<Icon>
								<FontAwesome
									name="hashtag"
									size={25}
									color={Colors.gray6}
								/>
							</Icon>
							<TextInput
								onChangeText={handleMultiInput('hashtag')}
								value={input['hashtag']}
								placeholder="Thêm hashtag"
							/>
						</Field>
					)}
					{input['post_images'] !== undefined && (
						<FieldImage>
							<Icon>
								<FontAwesome
									name="image"
									size={24}
									color={Colors.gray6}
								/>
							</Icon>
							<ImageInput
								photo={input['post_images']}
								setPhoto={handleMultiInput('post_images')}
							/>
						</FieldImage>
					)}
					{input['first_name'] !== undefined && (
						<Field>
							<Icon>
								<AntDesign
									name="edit"
									size={25}
									color={Colors.gray6}
								/>
							</Icon>
							<TextInput
								onChangeText={handleMultiInput('first_name')}
								value={input.first_name}
								placeholder="Nhập tên của bạn"
							/>
						</Field>
					)}
					{input['last_name'] !== undefined && (
						<Field>
							<Icon>
								<AntDesign
									name="edit"
									size={25}
									color={Colors.gray6}
								/>
							</Icon>
							<TextInput
								onChangeText={handleMultiInput('last_name')}
								value={input.last_name}
								placeholder="Nhập họ của bạn"
							/>
						</Field>
					)}
					{input['birthday'] !== undefined && (
						<Field>
							<Icon>
								<FontAwesome
									name="birthday-cake"
									size={25}
									color={Colors.gray6}
								/>
							</Icon>
							<TextInput
								onChangeText={handleMultiInput('birthday')}
								value={input.birthday}
								placeholder="Nhập ngày sinh: YYYY-mm--DD"
							/>
						</Field>
					)}
					{input['email'] !== undefined && (
						<Field>
							<Icon>
								<Entypo
									name="email"
									size={25}
									color={Colors.gray6}
								/>
							</Icon>
							<TextInput
								onChangeText={handleMultiInput('email')}
								value={input['email']}
								placeholder="Nhập địa chỉ email của bạn."
							/>
						</Field>
					)}
					{input['phone'] !== undefined && (
						<Field>
							<Icon>
								<FontAwesome
									name="phone"
									size={25}
									color={Colors.gray6}
								/>
							</Icon>
							<TextInput
								onChangeText={handleMultiInput('phone')}
								value={input['phone']}
								placeholder="Nhập số điện thoại của bạn."
							/>
						</Field>
					)}
					{input['address'] !== undefined && (
						<Field>
							<Icon>
								<FontAwesome5
									name="home"
									size={25}
									color={Colors.gray6}
								/>
							</Icon>
							<TextInput
								onChangeText={handleMultiInput('address')}
								value={input['address']}
								placeholder="Nhập địa chỉ hiện nay của bạn."
							/>
						</Field>
					)}
					<SubmitButton onPress={mapHandleSubmit[handleSubmit]}>
						<TextSubmitButton>ĐĂNG</TextSubmitButton>
					</SubmitButton>
				</FormView>
			</Container>
		);
	else return null;
};

export default ModelEdit;
