import React from "react"
import HomeScreen from "../screens/HomeScreen"
import AppBar from "../components/AppBar"
import UserScreen from "../screens/UserScreen"
import PostDetailScreen from "../screens/PostDetailScreen"
import SearchSreen from "../screens/SearchSreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

const HomeStack = (props) => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerTitle: () => <AppBar {...props} /> }}
            />
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
            <Stack.Screen name="Search" component={SearchSreen} />
        </Stack.Navigator>
    )
}
export default HomeStack
