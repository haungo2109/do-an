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
import { sendAuctionComment } from "../redux/reducers/commentReducer"
import { Picker } from "@react-native-picker/picker"
import { Field, SubmitButton, TextSubmitButton } from "../components/ModelEdit"
import { changeStatusAuctionComment } from "../redux/reducers/auctionReducer"

const WrapperComment = styled.View`
    padding: 0px 11px;
`
const WrapperInputComment = styled.View`
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
const ButtonSubmitCommentAuction = styled(SubmitButton)``
const TextButtonSubmit = styled(TextSubmitButton)``
const FieldCustom = styled(Field)`
    margin-top: 10px;
`
const TextStatusComment = styled.Text`
    color: ${Colors.gray1};
    font-size: 12px;
    padding: 2px;
    background-color: ${Colors.red5};
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
                listChoose: ["editAuction", "deleteAuction"],
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
        data.append("content", inputComment)
        data.append("price", inputPrice)
        dispatch(sendAuctionComment({ id: item.id, data })).then(() => {
            setInputComment("")
            setInputPrice("")
        })
    }

    return (
        <ScrollView>
            {item?.user && (
                <Auction {...item} handlePressMenu={handlePressMenu} />
            )}

            <WrapperComment>
                {data.map((c) => (
                    <ItemComment
                        user={c.user}
                        content={c.content}
                        price={c.price}
                        status_transaction={c.status_transaction}
                        key={c.id}
                    />
                ))}
                {user.id === item.user.id ? (
                    item.status_auction === "being auctioned" ? (
                        <SelectStatusComment data={data} auctionId={item.id} />
                    ) : null
                ) : (
                    <WrapperInputComment>
                        <AvatarToProfile
                            source={{
                                uri: baseURL + user.avatar,
                            }}
                            user_id={user.id}
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
                                placeholder="Nhập định giá của bạn..."
                            />
                        </WrapperInput>
                        <ButtonSendComment onPress={handleSendComment}>
                            <Icon>
                                <FontAwesome
                                    name="send"
                                    size={24}
                                    color="black"
                                />
                            </Icon>
                        </ButtonSendComment>
                    </WrapperInputComment>
                )}
            </WrapperComment>
        </ScrollView>
    )
}
const ItemComment = ({ user, content, price, status_transaction }) => {
    return (
        <>
            <WrapperInputComment>
                <AvatarToProfile
                    source={{
                        uri: baseURL + user.avatar,
                    }}
                    user_id={user.id}
                />
                <CommentText>
                    {content}
                    {status_transaction !== "none" && (
                        <TextStatusComment>
                            {" " + status_transaction}
                        </TextStatusComment>
                    )}
                </CommentText>
                <CommentPriceText>{price}</CommentPriceText>
            </WrapperInputComment>
        </>
    )
}
const SelectStatusComment = ({
    data,
    auctionId,
    statusComment = "in_process",
}) => {
    const dispatch = useDispatch()
    const [commentSelect, setCommentSelect] = useState("")
    const handlSubmitStatusComment = () => {
        dispatch(
            changeStatusAuctionComment({
                auctionId,
                comId: parseInt(commentSelect),
                statusComment,
            })
        )
        console.log("press submit", auctionId)
        console.log("press submit", commentSelect)
    }
    return (
        <>
            <FieldCustom>
                <Picker
                    selectedValue={commentSelect || "default"}
                    onValueChange={(val) => setCommentSelect(val)}
                    style={{
                        flex: 1,
                    }}
                >
                    <Picker.Item
                        enabled={false}
                        label="Chọn một định giá"
                        value="default"
                        style={{ color: Colors.gray5 }}
                    />
                    {data.map((c, i) => (
                        <Picker.Item
                            key={i}
                            label={c.content + " " + c.price}
                            value={c.id.toString()}
                        />
                    ))}
                </Picker>
            </FieldCustom>
            <ButtonSubmitCommentAuction onPress={handlSubmitStatusComment}>
                <TextButtonSubmit>ĐẶT ĐỊNH GIÁ</TextButtonSubmit>
            </ButtonSubmitCommentAuction>
        </>
    )
}

//diango để hỏi có chắc k
export default AuctionDetailScreen
