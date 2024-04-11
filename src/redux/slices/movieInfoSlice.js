import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../conf/axios.js';

export const fetchMovieInfo = createAsyncThunk('movieInfo/fetchMovieInfo', async ({ id }) => {
  const { data: movieResponse } = await axios.get(`/movie/${id}`);
  const { data: postersResponse } = await axios.get(
    `/image?page=1&limit=10&selectFields=previewUrl&movieId=${id}`,
  );
  const { data: reviewsResponse } = await axios.get(`review?page=1&limit=5&movieId=${id}`);

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
    incrementAttempt: (state) => {
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

export const { setMovieData, setPostersData, setReviewsData, incrementAttempt } =
  movieInfoSlice.actions;

export default movieInfoSlice.reducer;
