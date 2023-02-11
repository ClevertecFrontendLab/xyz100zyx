import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INavState } from './nav-slice.types';

const initialState: INavState = {
    activeDirectory: 0,
    activeGenre: 0,
    isHiddenGenres: false
}
/* eslint-disable no-param-reassign */
const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        changeActiveDirectory: (state, action: PayloadAction<number>) => {
            state.activeDirectory = action.payload;
        },
        changeActiveGenre: (state, action: PayloadAction<number>) => {
            state.activeGenre = action.payload;
        },
        toggleGenresVisibility: (state) => {
            state.isHiddenGenres = !state.isHiddenGenres;
        },
        setGenresVisibility: (state, action: PayloadAction<boolean>) => {
            state.isHiddenGenres = action.payload;
        }
    }
})


export const { changeActiveDirectory, changeActiveGenre, toggleGenresVisibility, setGenresVisibility } = navSlice.actions;

/* eslint-disable import/no-default-export */
export default navSlice.reducer;