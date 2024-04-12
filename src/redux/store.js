import { configureStore } from '@reduxjs/toolkit';
import sortReducer from './slices/sortSlice.js';
import moviesReducer from './slices/moviesSlice.js';
import movieInfoReducer from './slices/movieInfoSlice.js';

export const store = configureStore({
  reducer: { sortReducer, moviesReducer, movieInfoReducer },
});
