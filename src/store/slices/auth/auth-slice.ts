import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FetchedError, User} from "../../../types/data.types";
import {login, registration, rememberPassword, resetPassword} from "./async-actions";

interface State {
    user: User | null,
    error: null | FetchedError,
    status: 'pending' | 'fulfilled' | 'rejected' | null,
}

const initialState: State = {
    user: null,
    error: null,
    status: null,
}

/* eslint-disable */

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAllNull: (state) => {
            state.user = null;
            state.error = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.error = null;
            state.status = 'pending',
                state.user = null;
        }),
            builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.status = 'fulfilled'
                state.error = null
                localStorage.setItem('token', action.payload.jwt)
            }),
            builder.addCase(login.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = JSON.parse(action.payload!)

            }),
            builder.addCase(registration.pending, (state) => {
                state.error = null;
                state.status = 'pending'
                state.user = null
            }),
            builder.addCase(registration.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'fulfilled'
                state.error = null
            }),
            builder.addCase(registration.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = JSON.parse(action.payload!)

            }),
            builder.addCase(rememberPassword.pending, (state) => {
                state.error = null
                state.user = null
                state.status = 'pending'
            }),
            builder.addCase(rememberPassword.fulfilled, (state, action: PayloadAction<{ status: boolean }>) => {
                state.error = null
                state.status = 'fulfilled'
                state.user = null
            }),
            builder.addCase(rememberPassword.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = JSON.parse(action.payload!)
            }),
            builder.addCase(resetPassword.pending, (state) => {
                state.error = null;
                state.status = 'pending',
                    state.user = null;
            }),
            builder.addCase(resetPassword.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'fulfilled'
                state.error = null
            }),
            builder.addCase(resetPassword.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = JSON.parse(action.payload!)
            })
    }

})

export const {setAllNull} = authSlice.actions
export default authSlice.reducer;
