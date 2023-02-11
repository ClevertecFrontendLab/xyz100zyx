import { configureStore } from "@reduxjs/toolkit";
/* eslint-disable import/no-named-as-default */
import navSlice from "./slices/nav/nav-slice";
import popupSlice from "./slices/popup/popup-slice";

export const store = configureStore({
    reducer: {
        nav: navSlice,
        popup: popupSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;