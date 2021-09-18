import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useDispatch, useSelector } from "react-redux"
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer"
import "react-native-gesture-handler"
import HomeScreen from "../screens/HomeScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import UserScreen from "../screens/UserScreen"
import WellcomeScreen from "../screens/WellcomeScreen"
import ChatScreen from "../screens/ChatScreen"
import PostDetailScreen from "../screens/PostDetailScreen"
import AppBar from "../components/AppBar"
import AuctionScreen from "../screens/AuctionSreen"
import AuctionDetailScreen from "../screens/AuctionDetailScreen"
import { removeAll } from "../utils/AsyncStorage"
import { logoutAction } from "../redux/actions"
import SearchSreen from "../screens/SearchSreen"

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

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
const AuctionStack = (props) => {
    return (
        <Stack.Navigator initialRouteName="Auction">
            <Stack.Screen
                name="Auction"
                component={AuctionScreen}
                options={{ headerTitle: () => <AppBar {...props} /> }}
            />
            <Stack.Screen
                name="AuctionDetail"
                component={AuctionDetailScreen}
            />
            <Stack.Screen name="Search" component={SearchSreen} />
        </Stack.Navigator>
    )
}
function CustomDrawerContent(props) {
    const dispatch = useDispatch()
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={() => {
                    dispatch(logoutAction())
                    removeAll()
                    props.navigation.navigate("Wellcome")
                }}
            />
        </DrawerContentScrollView>
    )
}
const AppDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="AuctionStack"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="AuctionStack"
                component={AuctionStack}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="Chat"
                component={ChatScreen}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator>
    )
}

const AppContainer = () => {
    const user = useSelector((state) => state.user)
    return (
        <Stack.Navigator initialRouteName={user ? "App" : "Wellcome"}>
            <Stack.Screen
                name="Wellcome"
                component={WellcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
                name="App"
                component={AppDrawer}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AppContainer
