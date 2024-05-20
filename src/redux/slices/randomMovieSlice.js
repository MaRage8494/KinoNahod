import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../conf/axios.js';

export const fetchRandom = createAsyncThunk(
  'random/fetchRandom',
  async ({ isSeries, year, rating, genres, country, network }) => {
    const params = {};

    // Добавляем непустые параметры в объект запроса
    if (isSeries !== '') params.isSeries = isSeries;
    if (year !== '') params.year = year;
    if (rating !== '') params['rating.kp'] = rating;
    if (genres !== '') params['genres.name'] = genres;
    if (country !== '') params['countries.name'] = country;
    if (network !== '') params['networks.items.name'] = network;

    const { data } = await axios.get('/random', {
      params,
    });

    return data;
  },
);

const initialState = {
  result: {},
  status: 'loading',
  isLoading: false,
};

const randomMovieSlice = createSlice({
  name: 'random',
  initialState,
  reducers: {
    deleteResult: (state) => {
      state.result = {};
      state.status = 'loading';
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandom.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
        state.result = {};
      })
      .addCase(fetchRandom.fulfilled, (state, action) => {
        state.result = action.payload;
        state.status = 'success';
        state.isLoading = false;
      })
      .addCase(fetchRandom.rejected, (state) => {
        state.status = 'error';
        state.isLoading = false;
        state.result = {};
      });
  },
});

export const { deleteResult } = randomMovieSlice.actions;

export default randomMovieSlice.reducer;
