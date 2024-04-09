import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  moviePage: 1,
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setMoviePage: (state, action) => {
      state.moviePage = action.payload;
    },
  },
});

export const { setMoviePage } = pagesSlice.actions;

export default pagesSlice.reducer;
