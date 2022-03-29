import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from "./reducers/userReducer"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
 
const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, userReducer);
  
export const store = configureStore({
    reducer: persistedReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

