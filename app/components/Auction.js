import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import Colors from "../config/Colors"
import Font from "../config/Font"
import { dislikeAuction, likeAuction } from "../redux/reducers/auctionReducer"
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import Avatar from "./Avatar"
import { baseURL } from "../api/apiClient"
import { View } from "react-native"

const Container = styled.View`
    margin-bottom: 10px;
    background-color: ${Colors.gray};
`
const Header = styled.View`
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 6px;
    padding: 0 11px;
`
const Row = styled.View`
    align-items: center;
    flex-direction: row;
`
const User = styled.Text`
    font-size: ${Font.big};
    font-weight: bold;
    color: ${Colors.gray8};
`
const Time = styled.Text`
    font-size: ${Font.small};
    color: ${Colors.gray5};
`
const WrapperText = styled.View`
    padding: 0 11px;
    border-left-color: ${(props) => props.border || "palevioletred"};
    border-left-width: 5px;
`
const TextContent = styled.Text`
    font-size: ${Font.nomal};
    color: ${Colors.gray7};
    line-height: 20px;
    margin: 3px 0;
`
const TextTitle = styled.Text`
    font-size: ${Font.big};
    font-weight: bold;
`
const TextBasePrice = styled.Text`
    font-size: ${Font.big};
    font-weight: bold;
`
// deadline
// status_auction
// category
const TextCondition = styled.Text`
    font-size: ${Font.big};
    font-weight: bold;
`
const TextDeadline = styled.Text`
    font-size: ${Font.big};
    font-weight: bold;
`
const TextHashTag = styled(Auction)`
    background-color: ${Colors.gray2};
    margin-left: 11px;
    margin-top: 2px;
    padding: 0 2px;
    border-radius: 3px;
`
const WrapperTextHashTag = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`
const Photo = styled.Image`
    /* margin-top: 2px; */
    /* margin-right: 5px; */
    /* width: 500px; */
    height: 100%;
`

const WrapperImage = styled.View`
    height: 300px;
`
const Footer = styled.View`
    padding: 0 11px;
`
const FooterCount = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 9px 0;
`
const IconCount = styled.View`
    background: #1878f3;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
`
const Separator = styled.View`
    width: 100%;
    height: 1px;
    background: #f9f9f9;
`
const FooterMenu = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 9px 0;
`
const Button = styled.TouchableOpacity`
    flex-direction: row;
    padding: 5px;
    border-radius: 7px;
    background-color: ${Colors.gray2};
`
const Icon = styled.View`
    margin-right: 6px;
`
const Text = styled.Text`
    font-size: ${Font.small};
    color: ${Colors.gray7};
`
const ButtonMenu = styled.TouchableOpacity`
    padding: 7px;
    border-radius: 5px;
`
function Auction({
    content,
    create_at,
    id,
    like = false,
    isLike,
    auction_images,
    user,
    count_comment,
    handlePressMenu,
    goAuctionDetail,
    index,
    title,
    base_price,
    condition,
    deadline,
    status_auction,
    category,
}) {
    const dispatch = useDispatch()

    const handleLikeButton = () => {
        dispatch(likeAuction(id))
    }

    const handleDislikeButton = () => {
        dispatch(dislikeAuction(id))
    }
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
                <ButtonMenu
                    onPress={() =>
                        handlePressMenu(user.id, {
                            id,
                            title,
                            content,
                            base_price,
                            condition,
                            deadline,
                            category,
                            auction_images,
                            status_auction,
                            category,
                        })
                    }
                >
                    <Entypo
                        name="dots-three-horizontal"
                        size={15}
                        color="#222121"
                    />
                </ButtonMenu>
            </Header>
            <WrapperText
                border={
                    status_auction == "being auctioned"
                        ? Colors.green5
                        : Colors.yellow5
                }
            >
                <TextTitle>{title}</TextTitle>
                <TextContent>{content}</TextContent>
                <TextContent>Điều kiện: {condition}</TextContent>
                <TextContent>Giá cơ bản: {base_price}</TextContent>
                <TextContent>Hạn đấu giá: {deadline.slice(0, 10)}</TextContent>
            </WrapperText>
            {auction_images?.length !== 0 && (
                <WrapperImage horizontal showsHorizontalScrollIndicator={false}>
                    {/* {auction_images.map((c) => (
                        ))} */}
                    <Photo
                        style={{ resizeMode: "contain" }}
                        // key={c}
                        source={{ uri: baseURL + auction_images[0] }}
                    />
                </WrapperImage>
            )}
            <Footer>
                <Separator />
                <FooterMenu>
                    <Button
                        onPress={
                            isLike ? handleDislikeButton : handleLikeButton
                        }
                    >
                        <Icon>
                            <AntDesign
                                name="like2"
                                size={20}
                                color={isLike ? "blue" : "#424040"}
                            />
                        </Icon>
                        <Text>{like.length}</Text>
                    </Button>

                    <Button
                        onPress={() => {
                            goAuctionDetail(index, id)
                        }}
                    >
                        <Icon>
                            <MaterialCommunityIcons
                                name="comment-outline"
                                size={20}
                                color="#424040"
                            />
                        </Icon>
                        <Text>{count_comment} comment</Text>
                    </Button>
                </FooterMenu>
            </Footer>
        </Container>
    )
}

export default Auction
