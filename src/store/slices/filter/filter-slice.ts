import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterOptions, SortType } from "./filter.types";

const initialState: FilterOptions = {
    inputValue: '',
    activeGenre: 0,
    sortedType: SortType.DESC
}

/* eslint-disable */
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeInputValue: (state, action: PayloadAction<string>) => {
            state.inputValue = action.payload
        },
        toggleSortedType: (state) => {
            state.sortedType = state.sortedType === SortType.DESC ? SortType.ASC : SortType.DESC
        },
        changeActiveGenre: (state, action: PayloadAction<number>) => {
            state.activeGenre = action.payload;
        },
    }
})

export const {changeInputValue, toggleSortedType, changeActiveGenre} = filterSlice.actions
export default filterSlice.reducer;