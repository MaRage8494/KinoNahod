import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  moviePage: 1,
  moviesPerPage: 10,
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setMoviePage: (state, action) => {
      state.moviePage = action.payload;
    },
    setMoviesPerPage: (state, action) => {
      state.moviesPerPage = action.payload;
    },
  },
});

export const { setMoviePage, setMoviesPerPage } = pagesSlice.actions;

export default pagesSlice.reducer;
