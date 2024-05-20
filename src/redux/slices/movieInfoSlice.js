import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../conf/axios.js';

export const fetchMovieInfo = createAsyncThunk('movieInfo/fetchMovieInfo', async ({ id }) => {
  const { data } = await axios.get(`/movie/${id}`);
  const { movieResponse, postersResponse, reviewsResponse } = data;
  return { movieResponse, postersResponse, reviewsResponse };
});

const initialState = {
  movieData: [],
  postersData: [],
  reviewsData: [],
  status: 'loading',
  attempts: 0,
};

const movieInfoSlice = createSlice({
  name: 'movieInfo',
  initialState,
  reducers: {
    setMovieData: (state, action) => {
      state.movieData = action.payload;
    },
    setPostersData: (state, action) => {
      state.postersData = action.payload;
    },
    setReviewsData: (state, action) => {
      state.reviewsData = action.payload;
    },
    incrementInfoAttempt: (state) => {
      state.attempts += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieInfo.pending, (state) => {
        state.status = 'loading';
        state.movieData = [];
        state.postersData = [];
        state.reviewsData = [];
      })
      .addCase(fetchMovieInfo.fulfilled, (state, action) => {
        state.status = 'success';
        state.movieData = action.payload.movieResponse;
        state.postersData = action.payload.postersResponse;
        state.reviewsData = action.payload.reviewsResponse;
      })
      .addCase(fetchMovieInfo.rejected, (state) => {
        state.status = 'error';
        state.movieData = [];
        state.postersData = [];
        state.reviewsData = [];
      });
  },
});

export const { setMovieData, setPostersData, setReviewsData, incrementInfoAttempt } =
  movieInfoSlice.actions;

export default movieInfoSlice.reducer;
