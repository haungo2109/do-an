import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { baseURL } from "../api/apiClient"
import AvatarToProfile from "../components/Avatar"
import Auction from "../components/Auction"
import Colors from "../config/Colors"
import Font from "../config/Font"
import useModelMenu from "../hooks/useModelMenu"
import { FontAwesome } from "@expo/vector-icons"
import { sendAuctionComment, sendComment } from "../redux/reducers/commentReducer"

const WrapperComment = styled.View`
    padding: 0px 11px;
`
const ItemComment = styled.View`
    flex-direction: row;
    min-height: 42px;
    width: 100%;
    align-items: center;
    margin: 5px 0;
`
const CommentText = styled.Text`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    background-color: ${Colors.gray2};
`
const CommentPriceText = styled.Text`
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    background-color: ${Colors.gray2};
`
const TextInput = styled.TextInput`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    background-color: ${Colors.gray2};
`
const PriceInput = styled.TextInput`
    flex: 1;
    font-size: ${Font.nomal};
    border-radius: 8px;
    height: 100%;
    padding: 5px;
    margin-left: 8px;
    background-color: ${Colors.gray2};
`
const WrapperInput = styled.View`
    flex: 1;
`
const ButtonSendComment = styled.TouchableOpacity``
const Icon = styled.View`
    margin: 0 10px;
`
function AuctionDetailScreen({ route }) {
    const dispatch = useDispatch()
    const { auctionIndex } = route.params

    const { data } = useSelector((state) => state.comment)
    const user = useSelector((state) => state.user)
    const item = useSelector((state) => state.auction.data[auctionIndex])
    const [inputComment, setInputComment] = useState("")
    const [inputPrice, setInputPrice] = useState("")
    const { showModelMenu } = useModelMenu()

    useEffect(() => {
        console.log(item)
    })

    const handlePressMenu = (uid, auction) => {
        if (user.id === uid)
            showModelMenu({
                id: auction.id,
                listChoose: ["edit", "delete"],
                data: auction,
            })
        else
            showModelMenu({
                id: auction.id,
                listChoose: ["report"],
                data: auction,
            })
    }
    const handleSendComment = () => {
        const data = new FormData()
        data.append("content", inputComment);
        data.append("price", inputPrice);
        dispatch(sendAuctionComment({ id: item.id, data })).then(() => {
            setInputComment("");
            setInputPrice("");
        })
    }

    return (
        <ScrollView>
            {item?.user && (
                <Auction {...item} handlePressMenu={handlePressMenu} />
            )}
            <WrapperComment>
                {data.map((c) => (
                    <Item
                        user={c.user}
                        content={c.content}
                        price={c.price}
                        key={c.id}
                    />
                ))}
                <ItemComment>
                    <AvatarToProfile
                        source={{
                            uri: baseURL + user.avatar,
                        }}
                    />
                    <WrapperInput>
                        <TextInput
                            onChangeText={setInputComment}
                            value={inputComment}
                            placeholder="Nhập bình luận..."
                        />
                        <PriceInput
                            onChangeText={setInputPrice}
                            value={inputPrice}
                            placeholder="Nhập định gía của bạn..."
                        />
                    </WrapperInput>
                    <ButtonSendComment onPress={handleSendComment}>
                        <Icon>
                            <FontAwesome name="send" size={24} color="black" />
                        </Icon>
                    </ButtonSendComment>
                </ItemComment>
            </WrapperComment>
        </ScrollView>
    )
}
const Item = ({ user, content, price }) => {
    return (
        <ItemComment>
            <AvatarToProfile
                source={{
                    uri: baseURL + user.avatar,
                }}
            />
            <CommentText>{content}</CommentText>
            <CommentPriceText>{price}</CommentPriceText>
        </ItemComment>
    )
}
export default AuctionDetailScreen
