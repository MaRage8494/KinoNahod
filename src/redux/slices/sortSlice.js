import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  sortField: {
    name: 'году',
    sortProperty: 'year',
  },
  sortType: 1,
  moviePage: 1,
  moviesPerPage: 10,
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setMoviePage: (state, action) => {
      state.moviePage = Number(action.payload);
    },
    setMoviesPerPage: (state, action) => {
      state.moviesPerPage = Number(action.payload);
    },
    setFilters: (state, action) => {
      state.sortField = action.payload.sortField;
      state.searchValue = action.payload.searchValue;
      state.sortType = action.payload.sortType;
      state.moviePage = Number(action.payload.moviePage);
      state.moviesPerPage = Number(action.payload.moviesPerPage);
    },
  },
});

export const {
  setSortField,
  setSortType,
  setSearchValue,
  setMoviePage,
  setMoviesPerPage,
  setFilters,
} = sortSlice.actions;

export default sortSlice.reducer;
