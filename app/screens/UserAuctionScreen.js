import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import ListAuction from "../components/ListAuction"
import MakerAuction from "../components/MakerAuction"
import { getMyAuction } from "../redux/reducers/auctionReducer"

const Container = styled.SafeAreaView`
    flex: 1;
`

function UserAuctionScreen(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMyAuction())
    }, [])
    const renderHeaderListAuction = () => <MakerAuction />

    const handleRefresh = () => {
        return dispatch(getMyAuction())
    }
    return (
        <Container>
            <ListAuction
                headerComponent={renderHeaderListAuction}
                handleRefresh={handleRefresh}
            />
        </Container>
    )
}

export default UserAuctionScreen
