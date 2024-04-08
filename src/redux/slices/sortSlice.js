import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortField: {
    name: 'году',
    sortProperty: 'year',
  },
  sortType: 1,
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { setSortField, setSortType } = sortSlice.actions;

export default sortSlice.reducer;
