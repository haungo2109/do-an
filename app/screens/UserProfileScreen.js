import React, { useEffect } from "react"
import styled from "styled-components/native"
import Colors from "../config/Colors"
import { Entypo, Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"
import { baseURL, client_secret } from "../api/apiClient"
import { getMyPost } from "../redux/reducers/postReducer"
import ListFeed from "../components/ListFeed"
import { ScrollView } from "react-native"
import useModelEdit from "../hooks/useModelEdit"
import useModelImageSelection from "../hooks/useModelImageSelection"
import { updateCurrenUserAction } from "../redux/reducers/userReducer"
import MakerPost from "../components/MakerPost"

const Container = styled.SafeAreaView`
    flex: 1;
`
const WrrapperAvatar = styled.View`
    margin-top: 10px;
    width: 150px;
    height: 150px;
    border-radius: 200px;
    border: 5px solid ${Colors.facebookColor};
`
const Avatar = styled.Image`
    border-radius: 200px;
    width: 140px;
    height: 140px;
`
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
`
const TextTitle = styled.Text`
    margin-top: 15px;
    font-weight: bold;
    font-size: 20px;
`
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
`
const TextButtonEditProfile = styled.Text`
    color: ${Colors.gray1};
    font-weight: bold;
`
const Icon = styled.View`
    margin-right: 5px;
    justify-content: center;
    align-items: center;
`
const ContainerProfile = styled.View`
    /* flex: 1; */
    width: 100%;
    padding: 15px;
    align-items: center;
    background-color: ${Colors.gray1};
`
const WrapperInfo = styled.View`
    width: 100%;
    margin-top: 10px;
`
const WrapperTextInfo = styled.Text``
const ItemInfo = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 5px;
    font-size: 15px;
`

function UserProfileScreen(props) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const { images } = useSelector((state) => state.controller.imageSelection)
    const { showModelEdit } = useModelEdit("Ch???nh s???a th??ng tin c?? nh??n")
    const { showModelImageSelection } = useModelImageSelection(1, 1)

    useEffect(() => {
        dispatch(getMyPost())
    }, [])
    useEffect(() => {
        if (images !== null) {
            let data = new FormData()
            let item = images[0]
            data.append("avatar", {
                uri:
                    Platform.OS === "ios"
                        ? item.uri.replace("file://", "")
                        : item.uri,
                type: "image/" + item.uri.slice(item.uri.lastIndexOf(".") + 1),
                name: item.filename || `filename${i}.jpg`,
            })
            dispatch(updateCurrenUserAction({ id: user.id, data }))
        }
    }, [images])

    const renderHeaderListAuction = () => (
        <>
            <ContainerProfile>
                <WrrapperAvatar>
                    <Avatar source={{ uri: baseURL + user.avatar }} />
                    <ButtonChangeAvatar
                        onPress={() => {
                            showModelImageSelection()
                        }}
                    >
                        <FontAwesome name="camera" size={15} color="black" />
                    </ButtonChangeAvatar>
                </WrrapperAvatar>
                <TextTitle>{user.first_name + " " + user.last_name}</TextTitle>
                <ButtonEditProfile
                    onPress={() => {
                        showModelEdit({
                            id: user.id,
                            data: { ...user },
                            handleSubmit: "editProfile",
                        })
                    }}
                >
                    <Icon>
                        <FontAwesome name="pencil" size={15} color="white" />
                    </Icon>
                    <TextButtonEditProfile>
                        Ch???nh s???a th??ng tin c?? nh??n
                    </TextButtonEditProfile>
                </ButtonEditProfile>
                <WrapperInfo>
                    <ItemInfo>
                        <Icon>
                            <FontAwesome
                                name="birthday-cake"
                                size={15}
                                color="black"
                            />
                        </Icon>
                        <WrapperTextInfo>
                            {user.birthday || "Ch??a ??i???n th??ng tin."}
                        </WrapperTextInfo>
                    </ItemInfo>
                    <ItemInfo>
                        <Icon>
                            <Entypo name="email" size={15} color="black" />
                        </Icon>
                        <WrapperTextInfo>
                            {user.email || "Ch??a ??i???n th??ng tin."}
                        </WrapperTextInfo>
                    </ItemInfo>
                    <ItemInfo>
                        <Icon>
                            <FontAwesome name="phone" size={15} color="black" />
                        </Icon>
                        <WrapperTextInfo>
                            {user.phone || "Ch??a ??i???n th??ng tin."}
                        </WrapperTextInfo>
                    </ItemInfo>
                    <ItemInfo>
                        <Icon>
                            <FontAwesome5 name="home" size={15} color="black" />
                        </Icon>
                        <WrapperTextInfo>
                            {user.address || "Ch??a ??i???n th??ng tin."}
                        </WrapperTextInfo>
                    </ItemInfo>
                </WrapperInfo>
            </ContainerProfile>
            <MakerPost />
        </>
    )
    const handleRefresh = () => {
        return dispatch(getMyPost())
    }
    return (
        <Container>
            <ListFeed
                headerComponent={renderHeaderListAuction}
                handleRefresh={handleRefresh}
            />
        </Container>
    )
}

export default UserProfileScreen
