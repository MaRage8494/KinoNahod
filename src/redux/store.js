import { configureStore } from '@reduxjs/toolkit';
import sortReducer from './slices/sortSlice.js';
import pagesReducer from './slices/pagesSlice.js';

export const store = configureStore({
  reducer: { sortReducer, pagesReducer },
});
