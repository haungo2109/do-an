import { useNavigation } from "@react-navigation/core"
import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import useModelMenu from "../hooks/useModelMenu"
import {
    getAllAuctionAction,
    getMoreAuctionAction,
} from "../redux/reducers/auctionReducer"
import { fetchAuctionComment } from "../redux/reducers/commentReducer"
import Auction from "./Auction"

const WrapperActivityIndicator = styled.View`
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
`
const TextEndFooter = styled.Text`
    flex: 1;
`

function ListAuction(props) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)

    const user = useSelector((state) => state.user)
    const { data, nextPage, loading } = useSelector((state) => state.auction)
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
        if (!hasScrolled) {
            return null
        }
        if (nextPage) dispatch(getMoreAuctionAction(nextPage))
    }
    const renderFooter = () => {
        return nextPage ? (
            <WrapperActivityIndicator>
                <ActivityIndicator size="large" color="#0000ff" />
            </WrapperActivityIndicator>
        ) : null
    }
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await dispatch(getAllAuctionAction())
        setRefreshing(false)
    }, [])

    return (
        <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            onScroll={() => {
                setHasScrolled(true)
            }}
            nestedScrollEnabled
            extraData={data}
            contentContainerStyle={{
                flexDirection: "column",
                width: "100%",
            }}
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
            ListHeaderComponent={
                props?.headerComponent && props.headerComponent
            }
        />
    )
}

export default ListAuction
