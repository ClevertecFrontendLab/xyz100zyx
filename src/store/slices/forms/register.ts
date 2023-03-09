import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  regData: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
} = {
    regData: { username: '', password: '', firstName: '', lastName: '', phone: '', email: '' },
};

/* eslint-disable */

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setFirstStepFields: (state, { payload }: PayloadAction<{ username: string; password: string }>) => {
      state.regData.username = payload.username
      state.regData.password = payload.password;
    },
    setSecondStepFields: (state, { payload }: PayloadAction<{ name: string; surname: string }>) => {
      state.regData.firstName = payload.name;
      state.regData.lastName = payload.surname;
    },
    setThirdStepFields: (state, { payload }: PayloadAction<{ phone: string; email: string }>) => {
      state.regData.phone = payload.phone;
      state.regData.email = payload.email;
    },
  },
});

export const { setFirstStepFields, setSecondStepFields, setThirdStepFields } = registerSlice.actions;
export default registerSlice.reducer;
