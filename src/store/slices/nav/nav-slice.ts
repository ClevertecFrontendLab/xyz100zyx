import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INavState } from './nav-slice.types';
import { fetchGenres } from './async-actions';
import { AC } from '../abort-controller';
import { rejectBookStatus } from '../books/book-slice';

const initialState: INavState = {
  activeDirectory: 0,
  activeGenre: 0,
  isHiddenGenres: true,
  genres: [],
  status: null,
  error: null,
};

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
    nullableCategoryStatus: (state) => {
      state.status = null;
    },
    rejectCategoryStatus: (state) => {
        state.status = 'rejected'
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.isHiddenGenres = false;
      state.genres = [{ name: 'Все книги', path: 'all', id: 0 }, ...action.payload];
      state.status = 'fulfilled';
    });
    builder.addCase(fetchGenres.rejected, (state, action) => {
      state.status = 'rejected';
      rejectBookStatus()
      AC.abort()
    });
  },
});

export const {
  changeActiveDirectory,
  changeActiveGenre,
  toggleGenresVisibility,
  setGenresVisibility,
  nullableCategoryStatus,
  rejectCategoryStatus
} = navSlice.actions;

/* eslint-disable import/no-default-export */
export default navSlice.reducer;
