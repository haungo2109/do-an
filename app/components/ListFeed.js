import React, { useCallback, useState } from "react"
import Feed from "./Feed"
import { useDispatch, useSelector } from "react-redux"
import { ActivityIndicator, FlatList } from "react-native"
import useModelMenu from "../hooks/useModelMenu.js"
import { useNavigation } from "@react-navigation/native"
import { fetchPostComment } from "../redux/reducers/commentReducer"
import { TextEndFooter, WrapperActivityIndicator } from "./ListAuction"
import { getMorePostAction } from "../redux/reducers/postReducer"
import MakerPost from "./MakerPost"
import Users from "./Users"

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
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await dispatch(getAllPostAction())
        setRefreshing(false)
    }, [])
    return (
        <>
            <FlatList
                onScroll={() => {
                    setHasScrolled(true)
                }}
                onRefresh={onRefresh}
                refreshing={refreshing}
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
                renderItem={({ item, index }) => {
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
                }}
                ListFooterComponent={renderFooter}
                ListHeaderComponent={() => (
                    <>
                        <MakerPost />
                        <Users />
                    </>
                )}
            />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </>
    )
}

export default ListFeed
