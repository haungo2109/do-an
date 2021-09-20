import { useNavigation } from "@react-navigation/core"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { TextTitle } from "../components/ModelEdit"
import Colors from "../config/Colors"
import { removeANotification } from "../redux/reducers/notificationReducer"

const Container = styled.SafeAreaView`
    align-items: center;
    padding-top: 10px;
`
const WrapperItemButton = styled.TouchableOpacity`
    height: 70px;
    width: 100%;
    background-color: ${(props) => props.bgcolor};
    justify-content: center;
    padding-left: 11px;
`
const TextTitleCus = styled(TextTitle)`
    margin-bottom: 5px;
`
const TextContent = styled.Text``

function NotificationScreen(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const data = useSelector((s) => s.notification.data)

    useEffect(() => {
        console.log("data notification: ", data)
    })
    const handlePress = (item) => {
        if (item.obj === "introduction") {
            // navigation.navigate("Introduction")
            dispatch(removeANotification(item.id))
        }
        if (data.obj === "auction") {
            navigation.navigate("AuctionDetail", {
                id: data.id,
            })
        }
        if (data.obj === "post") {
            navigation.navigate("PostDetail", {
                id: data.id,
            })
        }
    }
    return (
        <Container>
            <TextTitle>THÔNG BÁO</TextTitle>
            {data?.length !== 0 &&
                data.map((c) => (
                    <WrapperItemButton
                        onPress={() => handlePress(c)}
                        key={c.id}
                        bgcolor={c.isSeen ? Colors.gray2 : Colors.blue2}
                    >
                        <TextTitleCus>{c.title}</TextTitleCus>
                        <TextContent>{c.body}</TextContent>
                    </WrapperItemButton>
                ))}
        </Container>
    )
}

export default NotificationScreen