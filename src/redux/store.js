import { configureStore } from '@reduxjs/toolkit';
import sortReducer from './slices/sortSlice.js';

export const store = configureStore({
  reducer: { sortReducer },
});
