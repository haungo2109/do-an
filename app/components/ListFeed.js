import React, { useCallback, useState } from "react"
import Feed from "./Feed"
import { useDispatch, useSelector } from "react-redux"
import { ActivityIndicator, FlatList } from "react-native"
import useModelMenu from "../hooks/useModelMenu.js"
import { useNavigation } from "@react-navigation/native"
import { fetchPostComment } from "../redux/reducers/commentReducer"
import {
    getAllPostAction,
    getMorePostAction,
} from "../redux/reducers/postReducer"
import styled from "styled-components"

const WrapperActivityIndicator = styled.View`
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
`
const TextEndFooter = styled.Text`
    flex: 1;
`

function ListFeed(props) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)

    const user = useSelector((state) => state.user)
    const { data, loading, nextPage } = useSelector((state) => state.post)
    const { showModelMenu } = useModelMenu()
    const navigation = useNavigation()

    const handlePressMenu = (uid, post) => {
        if (user.id === uid)
            showModelMenu({
                id: post.id,
                listChoose: ["edit", "delete"],
                data: post,
            })
        else showModelMenu({ id: post.id, listChoose: ["report"], data: post })
    }
    const checkLiked = (like = []) => {
        if (user) {
            return like.includes(user.id)
        }
        return false
    }
    const handleLoadMore = () => {
        if (!hasScrolled) {
            return null
        }
        if (nextPage) dispatch(getMorePostAction(nextPage))
    }
    const navigatePostDetail = async (index, id) => {
        await dispatch(fetchPostComment(id))
        navigation.navigate("PostDetail", { postIndex: index })
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
        await dispatch(getAllPostAction())
        setRefreshing(false)
    }, [])

    const renderItem = ({ item, index }) => {
        if (item?.user)
            return (
                <Feed
                    {...item}
                    index={index}
                    isLike={checkLiked(item.like)}
                    handlePressMenu={handlePressMenu}
                    goPostDetail={navigatePostDetail}
                />
            )
        else return null
    }
    const onScroll = () => {
        if (hasScrolled) return
        setHasScrolled(true)
    }
    return (
        <>
            <FlatList
                onScroll={onScroll}
                onRefresh={onRefresh}
                refreshing={refreshing}
                removeClippedSubviews={true}
                nestedScrollEnabled
                extraData={data}
                contentContainerStyle={{
                    flexDirection: "column",
                    width: "100%",
                }}
                data={data}
                style={{ flex: 1 }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                ListHeaderComponent={
                    props?.headerComponent && props.headerComponent
                }
            />
        </>
    )
}

export default ListFeed
