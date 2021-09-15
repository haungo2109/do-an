import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch } from "react-redux"
import styled from "styled-components/native"
import ListAuction from "../components/ListAuction"
import ToolBar from "../components/ToolBar"
import { getAllAuctionAction } from "../redux/reducers/auctionReducer"
import { getCategoryAction } from "../redux/reducers/categoryAuctionReducer"

const Container = styled.SafeAreaView`
    flex: 1;
`
const WrapperFlatList = styled.View`
    flex: 1;
`

function AuctionScreen(props) {
    const [refreshing, setRefreshing] = useState(false)
    const dispatch = useDispatch()

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await dispatch(getAllAuctionAction())
        setRefreshing(false)
    }, [])

    useEffect(() => {
        dispatch(getAllAuctionAction())
        dispatch(getCategoryAction())
    }, [])

    return (
        <>
            <Container>
                <ListAuction />
            </Container>
        </>
    )
}

export default AuctionScreen
