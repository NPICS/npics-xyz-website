import {combineReducers, configureStore} from "@reduxjs/toolkit";
import appSlice from "./app";
import wsSlice from "./ws";


const store = configureStore({
    reducer: combineReducers({
        app: appSlice.reducer,
        ws: wsSlice.reducer
    }),
})


export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;