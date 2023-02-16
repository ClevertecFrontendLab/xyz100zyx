import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryService } from "../../../services/category-service";
import { Category } from "../../../types/data.types";
import {AC} from '../abort-controller';


export const fetchGenres = createAsyncThunk<Category[], undefined, {rejectValue: string}>(
    'nav/fetchGenres',
    async (_, {rejectWithValue}) => {
        try{
            return await CategoryService.getCategories()
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)