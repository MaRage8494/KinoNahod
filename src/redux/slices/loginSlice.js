import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: window.localStorage.getItem('token'),
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = loginSlice.actions;

export default loginSlice.reducer;
