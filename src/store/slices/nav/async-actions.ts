import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryService } from "../../../services/category-service";
import { Category } from "../../../types/data.types";

/* eslint-disable prefer-arrow-callback */
export const fetchGenres = createAsyncThunk<Category[], undefined, {rejectValue: string}>(
    'nav/fetchGenres',
    async function(_, {rejectWithValue}){
        try{
            return await CategoryService.getCategories()
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)