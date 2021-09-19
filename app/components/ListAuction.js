import { useNavigation } from "@react-navigation/core"
import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import useModelMenu from "../hooks/useModelMenu"
import {
    getAllAuctionAction,
    getMoreAuctionAction,
} from "../redux/reducers/auctionReducer"
import { fetchAuctionComment } from "../redux/reducers/commentReducer"
import Auction from "./Auction"
import MakerAuction from "./MakerAuction"

const WrapperActivityIndicator = styled.View`
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
`
const TextEndFooter = styled.Text``

function ListAuction(props) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false)
    const user = useSelector((state) => state.user)
    const { data, nextPage } = useSelector((state) => state.auction)
    const { showModelMenu } = useModelMenu()
    const navigation = useNavigation()

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
                listChoose: ["reportAuction"],
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
        await dispatch(fetchAuctionComment(id))
        navigation.navigate("AuctionDetail", { auctionIndex: index })
    }
    const handleLoadMore = () => {
        if (nextPage) dispatch(getMoreAuctionAction(nextPage))
    }
    const renderFooter = () => {
        return (
            <WrapperActivityIndicator>
                {nextPage ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TextEndFooter>THE END</TextEndFooter>
                )}
            </WrapperActivityIndicator>
        )
    }
    const handleRefresh = useCallback(async () => {
        setRefreshing(true)
        await dispatch(getAllAuctionAction())
        setRefreshing(false)
    }, [])
    return (
        <ScrollView>
            <MakerAuction />
            <FlatList
                nestedScrollEnabled
                extraData={data}
                contentContainerStyle={{
                    flexDirection: "column",
                    width: "100%",
                }}
                onRefresh={handleRefresh}
                refreshing={refreshing}
                data={data}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {
                    if (item?.user)
                        return (
                            <Auction
                                {...item}
                                index={index}
                                isLike={checkLiked(item.like)}
                                handlePressMenu={handlePressMenu}
                                goAuctionDetail={navigateAuctionDetail}
                            />
                        )
                    else return null
                }}
                ListFooterComponent={renderFooter}
            />
        </ScrollView>
    )
}

export default ListAuction
