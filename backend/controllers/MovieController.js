import axios from '../conf/axios.js';

export const getAllMovies = async (req, res) => {
  try {
    const { moviesPerPage, moviePage, sortField, sortType } = req.query;
    const { data } = await axios.get(`/movie`, {
      params: {
        lists: 'top250',
        limit: moviesPerPage,
        page: moviePage,
        sortField: sortField,
        sortType: sortType,
        notNullFields: 'poster.url',
      },
    });

    res.json({
      ...data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить фильмы',
    });
  }
};

export const getSearch = async (req, res) => {
  try {
    const { limit, page, query } = req.query;
    const { data } = await axios.get(`/movie/search`, {
      params: {
        limit,
        page,
        query,
      },
    });

    res.json({
      ...data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить фильмы',
    });
  }
};

export const getMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { data: movieResponse } = await axios.get(`/movie/${movieId}`);
    const { data: postersResponse } = await axios.get(
      `/image?page=1&limit=10&selectFields=previewUrl&movieId=${movieId}`,
    );
    const { data: reviewsResponse } = await axios.get(`review?page=1&limit=5&movieId=${movieId}`);
    res.json({
      movieResponse,
      postersResponse,
      reviewsResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить фильм',
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { movieId, page } = req.query;
    const { data } = await axios.get(`review?page=${page}&limit=5&movieId=${movieId}`);
    res.json({
      ...data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить фильм',
    });
  }
};

export const getRandom = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).send('Недостаточно прав');
      return;
    }
    const { isSeries, year, rating, genres, country, network } = req.query;
    const params = {};
    if (isSeries !== '') params.isSeries = isSeries;
    if (year !== '') params.year = year;
    if (rating !== '') params['rating.kp'] = rating;
    if (genres !== '') params['genres.name'] = genres;
    if (country !== '') params['countries.name'] = country;
    if (network !== '') params['networks.items.name'] = network;
    const { data } = await axios.get('movie/random?notNullFields=name&notNullFields=poster.url', {
      params,
    });
    res.json({
      ...data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить фильм',
    });
  }
};
