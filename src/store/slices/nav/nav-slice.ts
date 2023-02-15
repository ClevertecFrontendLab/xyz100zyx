import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INavState } from './nav-slice.types';
import { FetchedError } from '../../../types/data.types';
import { CategoryService } from '../../../services/category-service';

const initialState: INavState = {
    activeDirectory: 0,
    activeGenre: 0,
    isHiddenGenres: true,
    genres: [],
    status: null,
    error: null,
    isErrorOpen: false
}

/* eslint-disable prefer-arrow-callback */
export const fetchGenres = createAsyncThunk(
    'nav/fetchGenres',
    async function(_, {rejectWithValue}){
        try{
            return await CategoryService.getCategories()
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)

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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGenres.pending, (state) => {state.status = 'pending'})
        builder.addCase(fetchGenres.fulfilled, (state, action) => {
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


export const { changeActiveDirectory, changeActiveGenre, toggleGenresVisibility, setGenresVisibility, closeErrorPopup } = navSlice.actions;

/* eslint-disable import/no-default-export */
export default navSlice.reducer;