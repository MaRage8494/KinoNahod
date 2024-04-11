import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../conf/axios.js';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ moviePage, sortField, sortType, searchValue, moviesPerPage }) => {
    if (searchValue) {
      const { data } = await axios.get(`/movie/search?`, {
        params: {
          limit: moviesPerPage,
          page: moviePage,
          query: searchValue,
        },
      });

      return data;
    } else {
      const { data } = await axios.get(`/movie?lists=top250`, {
        params: {
          limit: moviesPerPage,
          page: moviePage,
          sortField: sortField,
          sortType: sortType,
          notNullFields: 'poster.url',
        },
      });

      return data;
    }
  },
);

const initialState = {
  items: [],
  status: 'loading',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const { setItems } = moviesSlice.actions;

export default moviesSlice.reducer;
