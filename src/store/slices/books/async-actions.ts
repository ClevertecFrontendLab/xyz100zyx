import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookService } from '../../../services/book-service';
import { FetchedBook, FetchedBooks } from '../../../types/data.types';

/* eslint-disable prefer-arrow-callback */

export const fetchBooks = createAsyncThunk<FetchedBooks[], undefined, {rejectValue: string}>('books/fetchBooks', async function (_, { rejectWithValue }) {
  try {
    return await BookService.getBooks();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchBookById = createAsyncThunk<FetchedBook, number, {rejectValue: string}>('books/fetchBookById', async function (id: number, { rejectWithValue }) {
  try {
    return await BookService.getBookById(id);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
