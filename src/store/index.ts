import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./app";
import wsSlice from "./ws";
import userSlice from "./user";
import platformSlice from "./platfrom";

const store = configureStore({
  reducer: combineReducers({
    app: appSlice.reducer,
    ws: wsSlice.reducer,
    user: userSlice.reducer,
    platform: platformSlice.reducer,
  }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
