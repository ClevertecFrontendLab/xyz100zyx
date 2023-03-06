import { configureStore } from "@reduxjs/toolkit";
/* eslint-disable import/no-named-as-default */
import navSlice from "./slices/nav/nav-slice";
import popupSlice from "./slices/popup/burger-slice";
import bookSlice from "./slices/books/book-slice";
import filterSlice from "./slices/filter/filter-slice";
import authSlice from "./slices/auth/auth-slice";
import registerSlice from "./slices/forms/register";

export const store = configureStore({
    reducer: {
        nav: navSlice,
        popup: popupSlice,
        books: bookSlice,
        filter: filterSlice,
        auth: authSlice,
        register: registerSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;