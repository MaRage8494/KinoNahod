import { configureStore } from '@reduxjs/toolkit';
import sortReducer from './slices/sortSlice.js';
import pagesReducer from './slices/pagesSlice.js';
import moviesReducer from './slices/moviesSlice.js';
import searchReducer from './slices/searchSlice.js';
import movieInfoReducer from './slices/movieInfoSlice.js';

export const store = configureStore({
  reducer: { sortReducer, pagesReducer, moviesReducer, searchReducer, movieInfoReducer },
});
