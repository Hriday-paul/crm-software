import { combineReducers, configureStore } from '@reduxjs/toolkit'
import baseApi from './Features/BaseApi';
import UserSlice from './Slices/UserSlice';
import StyleSlice from './Slices/StyleSlice';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['user', ],
}

const reducer = combineReducers({
    user: UserSlice,
    styles : StyleSlice,
    [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReduces = persistReducer(persistConfig, reducer);

const Store = configureStore({
    reducer: persistedReduces,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware),
})

// Create a persistor instance
export const Persistor = persistStore(Store);

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>
export default Store;