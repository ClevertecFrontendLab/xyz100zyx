import {createSlice} from '@reduxjs/toolkit';

const initialState: Record<string, boolean> = {
    burgerNav: false,
}

/* eslint-disable no-param-reassign */
const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        toggle: (state) => {
            state.burgerNav = !state.burgerNav
        },
        close: (state) => {
            state.burgerNav = false
        },
        open: (state) => {
            state.burgerNav = true
        }
    }
})

export const {toggle, close, open} = popupSlice.actions;
/* eslint-disable import/no-default-export */
export default popupSlice.reducer;