import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Avatar from './Avatar';
import { baseURL } from '../api/apiClient';
import { useDispatch } from 'react-redux';
import { dislikePost, likePost } from '../redux/reducers/postReducer';
import Colors from '../config/Colors';

const Container = styled.View`
	flex: 1;
	margin-bottom: 10px;
	background-color: ${Colors.gray};
`;
const Header = styled.View`
	height: 50px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 6px;
	padding: 0 11px;
`;
const Row = styled.View`
	align-items: center;
	flex-direction: row;
`;
const User = styled.Text`
	font-size: 12px;
	font-weight: bold;
	color: #222121;
`;
const Time = styled.Text`
	font-size: 9px;
	color: #747476;
`;
const Post = styled.Text`
	font-size: 12px;
	color: #222121;
	line-height: 16px;
	padding: 0 11px;
`;
const TextHashTag = styled(Post)`
	background-color: ${Colors.gray2};
	margin-left: 11px;
    padding: 0 2px;
    border-radius: 3px;
`;
const WrapperTextHashTag = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
`;
const Photo = styled.Image`
	margin-top: 9px;
	margin-right: 5px;
	width: 500px;
	height: 100%;
`;

const WrapperImage = styled.ScrollView`
	height: 300px;
`;
const Footer = styled.View`
	padding: 0 11px;
`;
const FooterCount = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 9px 0;
`;
const IconCount = styled.View`
	background: #1878f3;
	width: 20px;
	height: 20px;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	margin-right: 6px;
`;
const TextCount = styled.Text`
	font-size: 11px;
	color: #424040;
`;
const Separator = styled.View`
	width: 100%;
	height: 1px;
	background: #f9f9f9;
`;
const FooterMenu = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 9px 0;
`;
const Button = styled.TouchableOpacity`
	flex-direction: row;
	padding: 5px;
	border-radius: 7px;
	background-color: ${Colors.gray2};
`;
const Icon = styled.View`
	margin-right: 6px;
`;
const Text = styled.Text`
	font-size: 12px;
	color: #424040;
`;
const Feed = ({
	content,
	create_at,
	hashtag = [],
	id,
	like = false,
	post_images,
	user,
	vote,
}) => {
	const dispatch = useDispatch();

	const handleLikeButton = () => {
		dispatch(likePost(id));
	};
	const handleDislikeButton = () => {
		dispatch(dislikePost(id));
	};

	return (
		<Container>
			<Header>
				<Row>
					<Avatar
						source={{
							uri: baseURL + user.avatar,
						}}
					/>
					<View style={{ paddingLeft: 10 }}>
						<User>{user.full_name}</User>
						<Row>
							<Time>{create_at}</Time>
							<Entypo
								name="dot-single"
								size={12}
								color="#747476"
							/>
							<Entypo name="globe" size={10} color="#747476" />
						</Row>
					</View>
				</Row>

				<Entypo
					name="dots-three-horizontal"
					size={15}
					color="#222121"
				/>
			</Header>

			<Post>{content}</Post>
			{hashtag?.length !== 0 && (
				<WrapperTextHashTag>
					<TextHashTag>
						{hashtag.map((c) => '#' + c.name).join(', ')}
					</TextHashTag>
				</WrapperTextHashTag>
			)}
			{post_images?.length !== 0 && (
				<WrapperImage horizontal showsHorizontalScrollIndicator={false}>
					{post_images.map((c) => (
						<Photo
							style={{ resizeMode: 'contain' }}
							key={c}
							source={{ uri: baseURL + c }}
						/>
					))}
				</WrapperImage>
			)}

			<Footer>
				<Separator />
				<FooterMenu>
					<Button
						onPress={like ? handleDislikeButton : handleLikeButton}
					>
						<Icon>
							<AntDesign
								name="like2"
								size={20}
								color={like ? 'blue' : '#424040'}
							/>
						</Icon>
						<Text>{vote}</Text>
					</Button>

					<Button>
						<Icon>
							<MaterialCommunityIcons
								name="comment-outline"
								size={20}
								color="#424040"
							/>
						</Icon>
						<Text>1 comment</Text>
					</Button>
				</FooterMenu>
			</Footer>
		</Container>
	);
};

export default Feed;
