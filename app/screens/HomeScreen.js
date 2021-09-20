import React, { useCallback, useEffect, useState } from "react"
import { RefreshControl, ScrollView } from "react-native"
import AppBar from "../components/AppBar"
import ListFeed from "../components/ListFeed"
import MakerPost from "../components/MakerPost"
import Users from "../components/Users"
import styled from "styled-components/native"
import { useDispatch, useSelector } from "react-redux"
import { getCurrenUserAction } from "../redux/reducers/userReducer"
import { getAllPostAction } from "../redux/reducers/postReducer"
import Colors from "../config/Colors"

const WrapperList = styled.View`
    background-color: ${Colors.gray2};
    flex: 1;
`

function HomeScreen(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrenUserAction())
        dispatch(getAllPostAction())
    }, [])

    return (
        <WrapperList>
            <ListFeed />
        </WrapperList>
    )
}

export default HomeScreen
