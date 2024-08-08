import { createSlice } from '@reduxjs/toolkit';

import { getItemStorage } from '../utils/authLocalStorage.js';

const initialState = getItemStorage() ?? { username: '', token: '' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserData: (state, action) => ({
      ...state,
      username: action.payload.username,
      token: action.payload.token,
    }),
  },
});

export const { updateUserData } = authSlice.actions;

export default authSlice.reducer;
