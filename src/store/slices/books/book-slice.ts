import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchBookById, fetchBooks} from './async-actions';
import { FetchedBook, FetchedBooks, FetchedError } from '../../../types/data.types';

/* eslint-disable */

const initialState: {
  books: FetchedBooks[];
  book: FetchedBook | null;
  status: 'pending' | 'fulfilled' | 'rejected' | null;
  error: null | FetchedError;
} = {
  books: [],
  book: null,
  error: null,
  status: null,
}; 

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    nullableStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<FetchedBooks[]>) => {
      state.books = action.payload;
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = {...JSON.parse(action.payload as string)}
    });
    builder.addCase(fetchBookById.pending, (state) => {
      console.log('now is ', state.status)
      state.status = 'pending';
      console.log('now is ', state.status)
      state.error = null;
    });
    builder.addCase(fetchBookById.fulfilled, (state, action: PayloadAction<FetchedBook>) => {
      state.status = 'fulfilled';
      state.book = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBookById.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = {...JSON.parse(action.payload as string)}
      console.log(state.error)
    });
  },
});

export const { nullableStatus } = bookSlice.actions;
export default bookSlice.reducer;
