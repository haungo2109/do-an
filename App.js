import React, { useEffect, useRef, useState } from "react"
import { ActivityIndicator, StatusBar, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { store, persistor } from "./app/redux/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import styled from "styled-components"
import ModelEdit from "./app/components/ModelEdit"
import ModelMenu from "./app/components/ModelMenu"
import ModelImageSelection from "./app/components/ModelImageSelection"
import "react-native-gesture-handler"
import AppContainer from "./app/navigations"
import Constants from "expo-constants"
import * as Notifications from "expo-notifications"

const WrapperModel = styled.View`
    flex: 1;
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
`
const LoadingMarkup = () => (
    <View
        style={{
            flex: 1,
            justifyContent: "center",
        }}
    >
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
)

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState("")
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()
    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        )

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification)
            })

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response)
                }
            )

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            )
            Notifications.removeNotificationSubscription(
                responseListener.current
            )
        }
    }, [])
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingMarkup />} persistor={persistor}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                <NavigationContainer>
                    <AppContainer />
                </NavigationContainer>
                <WrapperModel>
                    <ModelMenu />
                    <ModelEdit />
                    <ModelImageSelection />
                </WrapperModel>
            </PersistGate>
        </Provider>
    )
}

export async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: "default",
        title: "Original Title",
        body: "And here is the body!",
        data: { someData: "goes here" },
    }

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    })
}

async function registerForPushNotificationsAsync() {
    let token
    if (Constants.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!")
            return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
        console.log(token)
    } else {
        alert("Must use physical device for Push Notifications")
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        })
    }

    return token
}
