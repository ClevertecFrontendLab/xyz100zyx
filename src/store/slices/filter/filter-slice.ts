import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    inputValue: ''
}

/* eslint-disable */
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeInputValue: (state, action: PayloadAction<string>) => {
            state.inputValue = action.payload
        }
    }
})

export const {changeInputValue} = filterSlice.actions
export default filterSlice.reducer;