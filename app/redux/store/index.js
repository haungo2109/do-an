import { configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../reducers';
import { combineReducers } from 'redux';


const persistConfig = {
	key: 'root',
	version: 1,
	storage: AsyncStorage,
	whitelist: ["auth", "user"],
};

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers(rootReducer)
);

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
});

let persistor = persistStore(store);

export { persistor, store };