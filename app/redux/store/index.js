import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "../reducers"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers } from "redux"

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
    whitelist: ["user", "categoryAuction", "reportType"],
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers(rootReducer)
)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

let persistor = persistStore(store)

export { persistor, store }
