import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../../services/auth-service";
import { FetchedError, User } from "../../../types/data.types";

interface PayloadStateLogin{
    login: string,
    password: string
}

interface PayloadStateRegister{
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
}

interface PayloadSendEmailMessage{
    email: string
}

interface PayloadResetPassword{
    password: string,
    passwordConfirmation: string,
    code: string
}

export const login = createAsyncThunk<User, PayloadStateLogin, {rejectValue: string}>(
    'auth/login',
    async ({login, password}, {rejectWithValue}: any) => {
        try{
            return await AuthService.login({identifier: login, password})
        }catch({message}: any){
            return rejectWithValue(message);
        }
    }
)

export const registration = createAsyncThunk<User, PayloadStateRegister, {rejectValue: string}>(
    'auth/register',
    async ({username, password, firstName, lastName, phone, email}, {rejectWithValue}: any) => {
        try{
            return await AuthService.registration({username, password, firstName, lastName, phone, email})
        }catch({message}: any){
            return rejectWithValue(message);
        }
    }
)

export const rememberPassword = createAsyncThunk<{status: boolean}, PayloadSendEmailMessage, {rejectValue: string}>(
    'auth/rememberPassword',
    async ({email}, {rejectWithValue}: any) => {
        try{
            return await AuthService.rememberPassword(email)
        }catch({message}: any){
            return rejectWithValue(message);
        }
    }

)

export const resetPassword = createAsyncThunk<User, PayloadResetPassword, {rejectValue: string}>(
    'auth/resetPassword',
    async ({password, passwordConfirmation, code}, {rejectWithValue}: any) => {
        try{
            return await AuthService.resetPassword(password, passwordConfirmation, code)
        }catch({message}: any){
            return rejectWithValue(message);
        }
    }
)
