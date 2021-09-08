import React, { useState } from 'react';
import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
	ImageBackground,
	Container,
	Logo,
	ButtonLink,
	TextLink,
	SmallText,
} from './WellcomeScreen';
import { FontAwesome, Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

const WapperInput = styled.View`
	width: 75%;
	height: 42px;
	flex-direction: row;
	border-radius: 21px;
	background: #f3f4f6;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
`;
const GroupButton = styled(LinearGradient)`
	flex: 6;
	width: 100%;
	align-items: center;
	justify-content: center;
`;
const ButtonBorder = styled.TouchableOpacity`
	width: 75%;
	height: 42px;
	border-radius: 21px;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
	background-color: transparent;
	border: 1px solid #f3f4f6;
`;
const TextButtonBorder = styled.Text`
	color: #f3f4f6;
`;
const Input = styled.TextInput``;
const Icon = styled.View`
	margin-right: 6px;
	position: absolute;
	left: 15px;
`;
function RegisterScreen({ navigation }, props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

	const handleSetPassword = () => {};
	return (
		<ImageBackground source={require('./../assets/story2.jpg')}>
			<Container>
				<Logo>
					<Text>RegsterScreen view ahihi</Text>
				</Logo>
				<GroupButton colors={['rgba(2,0,36,0)', 'rgba(10,9,15,1)']}>
					<InputForm
                        icon="user"
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
					<InputForm
                        icon="mail"
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
					<InputForm
                        icon="lock"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                    />
					<ButtonBorder>
						<TextButtonBorder>Login</TextButtonBorder>
					</ButtonBorder>
					<SmallText>Forgot your password?</SmallText>
					<ButtonLink onPress={handleSetPassword}>
						<TextLink>Reset Password</TextLink>
					</ButtonLink>
				</GroupButton>
			</Container>
		</ImageBackground>
	);
}

const InputForm = ({ icon, value, placeholder, onChangeText}) => {
	return (
		<WapperInput>
			<Icon>
				<Feather name={icon} size={24} color="black" />
			</Icon>
			<Input
				onChangeText={onChangeText}
				value={value}
				placeholder={placeholder}
			/>
		</WapperInput>
	);
};

export default RegisterScreen;
