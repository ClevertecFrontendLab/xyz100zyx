import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INavState } from './nav-slice.types';
import {fetchGenres} from './async-actions'

const initialState: INavState = {
    activeDirectory: 0,
    activeGenre: 0,
    isHiddenGenres: true,
    genres: [],
    status: null,
    error: null,
    isErrorOpen: false
}

 type StatusType = 'pendign' | 'fulfilled' | 'rejected' | null

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
        },
        closeErrorPopup: (state) => {
            state.isErrorOpen = false;
        },
        nullableCategoryStatus: (state) => {
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGenres.pending, (state) => {state.status = 'pending'})
        builder.addCase(fetchGenres.fulfilled, (state, action) => {
            state.isHiddenGenres = false;
            state.genres = action.payload
            state.status = 'fulfilled'
        })
        builder.addCase(fetchGenres.rejected, (state, action) => {
            state.status = 'rejected'
            state.isErrorOpen = true;
            console.log(action.payload)
        })
    }
})


export const { changeActiveDirectory, changeActiveGenre, toggleGenresVisibility, setGenresVisibility, closeErrorPopup, nullableCategoryStatus } = navSlice.actions;

/* eslint-disable import/no-default-export */
export default navSlice.reducer;