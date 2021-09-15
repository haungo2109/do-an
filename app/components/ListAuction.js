import { useNavigation } from "@react-navigation/core"
import React, { useEffect } from "react"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { baseURL } from "../api/apiClient"
import Colors from "../config/Colors"
import useModelMenu from "../hooks/useModelMenu"
import Auction from "./Auction"
import AvatarToProfile from "./Avatar"

const WrapperList = styled.FlatList`
    background-color: ${Colors.gray2};
    flex: 1;
    flex-direction: "column";
    height: "100%";
    width: "100%";
`
const temp = [
    {
        accept_price: 20000,
        auction_images: [
            "/auction_images/2021/08/BH-Oakmont-211-2nd-st-46-6-1624611939.jpg",
            "/auction_images/2021/08/home-banner-2020-02-min.jpg",
            "/auction_images/2021/08/99231880.jpg",
        ],
        base_price: 1000,
        buyer: {
            avatar: "/static/avatar/user_haungo1/20210408_105342_o6Ls5jm.jpg",
            full_name: "kanj haungo",
            id: 7,
        },
        category: 2,
        condition: "NOP",
        content: "Bán nhà gây quỹ vào từ thiện 50% lợi nhuận",
        count_comment: 2,
        create_at: "2021-08-05T10:17:24.962753Z",
        date_success: "2021-09-04T03:39:25.139497Z",
        deadline: "2021-09-10T09:11:27Z",
        id: 1,
        like: [7],
        status_auction: "succ",
        title: "Auction",
        user: {
            avatar: "/static/avatar/user_haungo1/20210408_105342_o6Ls5jm.jpg",
            full_name: "kanj haungo",
            id: 7,
        },
    },
]
function ListAuction(props) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const { data, loading } = useSelector((state) => state.auction)
    const { showModelMenu } = useModelMenu()
    const navigation = useNavigation()

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
    const checkLiked = (like = []) => {
        if (user) {
            return like.includes(user.id)
        }
        return false
    }
    const navigateAuctionDetail = async (index, id) => {
        // await dispatch(fetchComment(id));
        // navigation.navigate('AuctionDetail', { auctionIndex: index });
    }
    const getCategory = (category) => {
        return "ahihi category"
    }
    return (
        <FlatList
            extraData={data}
            contentContainerStyle={{
                flexDirection: "column",
                width: "100%",
            }}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                if (item?.user)
                    return (
                        <Auction
                            {...item}
                            category={getCategory(item.category)}
                            isLike={checkLiked(item.like)}
                            handlePressMenu={handlePressMenu}
                            goAuctionDetail={navigateAuctionDetail}
                        />
                    )
                else return null
            }}
        />
    )
}
// {loading && <ActivityIndicator size="large" color="#0000ff" />}

export default ListAuction
