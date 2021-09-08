import React from 'react';
import styled from 'styled-components/native';
import Colors from '../config/Colors';
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import ToolBar from '../components/ToolBar';

const WrrapperAvatar = styled.View`
	margin-top: 50px;
	width: 150px;
	height: 150px;
	border-radius: 200px;
	border: 5px solid ${Colors.facebookColor};
`;
const Avatar = styled.Image`
	border-radius: 200px;
	width: 140px;
	height: 140px;
`;
const ButtonChangeAvatar = styled.TouchableOpacity`
	position: absolute;
	bottom: 2px;
	right: 5px;
	background-color: ${Colors.gray1};
	border: 2px solid white;
	padding: 10px;
	border-radius: 50px;
	justify-content: center;
	align-items: center;
`;
const TextTitle = styled.Text`
	margin-top: 15px;
	font-weight: bold;
	font-size: 20px;
`;
const ButtonEditProfile = styled.TouchableOpacity`
	height: 42px;
	width: 100%;
	flex-direction: row;
	margin-top: 15px;
	color: ${Colors.facebookColor};
	border-radius: 7px;
	align-items: center;
	justify-content: center;
	background-color: ${Colors.facebookColor};
`;
const TextButtonEditProfile = styled.Text`
	color: ${Colors.gray1};
	font-weight: bold;
`;
const Icon = styled.View`
	margin-right: 5px;
	justify-content: center;
	align-items: center;
`;
const ContainerProfile = styled.View`
	/* flex: 1; */
	width: 100%;
	padding: 15px;
	align-items: center;
	background-color: ${Colors.gray1};
`;
const WrapperInfo = styled.View`
	width: 100%;
	margin-top: 10px;
`;
const WrapperTextInfo = styled.Text``;
const ItemInfo = styled.View`
	flex-direction: row;
	align-items: center;
	padding: 5px;
	font-size: 15px;
`;

function UserScreen(props) {
	return (
		<>
			<ContainerProfile>
				<WrrapperAvatar>
					<Avatar source={require('../assets/user3.jpg')} />
					<ButtonChangeAvatar>
						<FontAwesome name="camera" size={15} color="black" />
					</ButtonChangeAvatar>
				</WrrapperAvatar>
				<TextTitle>Haungo Kan</TextTitle>
				<ButtonEditProfile>
					<Icon>
						<FontAwesome name="pencil" size={15} color="white" />
					</Icon>
					<TextButtonEditProfile>
						Chỉnh sửa thông tin cá nhân
					</TextButtonEditProfile>
				</ButtonEditProfile>
				<WrapperInfo>
					<ItemInfo>
						<Icon>
							<FontAwesome
								name="graduation-cap"
								size={15}
								color="black"
							/>
						</Icon>
						<WrapperTextInfo>Đã học tại TP HCM</WrapperTextInfo>
					</ItemInfo>
					<ItemInfo>
						<Icon>
							<FontAwesome5 name="home" size={15} color="black" />
						</Icon>
						<WrapperTextInfo>Đến từ Bình Phước</WrapperTextInfo>
					</ItemInfo>
				</WrapperInfo>
			</ContainerProfile>
			<ToolBar />
		</>
	);
}

export default UserScreen;
