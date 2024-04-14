import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import MovieInfo from '../components/MovieInfo/index.jsx';
import SceletonMovieInfo from '../components/MovieInfo/SceletonMovieInfo.jsx';
import SimilarMovies from '../components/SimilarMovies.jsx';
import Posters from '../components/Posters.jsx';
import Actors from '../components/Actors.jsx';
import Reviews from '../components/Reviews/index.jsx';

// import euphoria from './euphoria.json';
import Series from '../components/Series.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieInfo } from '../redux/slices/movieInfoSlice.js';
import TryAgain from '../components/TryAgain.jsx';
import { incrementInfoAttempt } from '../redux/slices/movieInfoSlice';

function Movie() {
  const { id } = useParams();

  const { movieData, postersData, reviewsData, status, attempts } = useSelector(
    (state) => state.movieInfoReducer,
  );
  const dispatch = useDispatch();

  const fetchMovieInfoData = React.useCallback(async () => {
    try {
      dispatch(fetchMovieInfo({ id }));
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Ошибка при получении фильмов:', err);
    }
  }, [dispatch, id]);

  React.useEffect(() => {
    fetchMovieInfoData();
  }, [fetchMovieInfoData]);

  // console.log(euphoria);
  // React.useEffect(() => {
  //   setMovieData(euphoria);
  //   setLoading(false);
  // }, []);

  return (
    <>
      {status === 'loading' ? (
        <SceletonMovieInfo />
      ) : status === 'error' ? (
        <TryAgain
          attempts={attempts}
          action={fetchMovieInfoData}
          incrementFunction={() => dispatch(incrementInfoAttempt())}
        />
      ) : (
        <>
          <Link to="/" className="button button--back">
            <span>Назад</span>
          </Link>
          <MovieInfo
            poster={movieData.poster.url}
            name={movieData.name}
            description={movieData.description}
            rating={movieData.rating.imdb}
          />
          {movieData.type === 'movie' ? (
            ''
          ) : (
            <div className="series">
              <h2 className="series__title">Сезоны и серии</h2>
              <Series seriesInfo={movieData.seasonsInfo} />
            </div>
          )}
          <h2 className="actors__title">Актёрский состав</h2>
          <Actors actors={movieData.persons || ''} />
          <div className="carousels">
            <div className="posters">
              <h1 className="carousel__title">Постеры</h1>
              <Posters posters={postersData} />
            </div>
            <div className="similar">
              <h1 className="carousel__title">Похожие фильмы</h1>
              <SimilarMovies movies={movieData.similarMovies} />
            </div>
          </div>
          <h2 className="reviews__title">Отзывы пользователей</h2>
          <Reviews reviews={reviewsData} pages={reviewsData.pages} movieId={id} />
        </>
      )}
    </>
  );
}

export default Movie;
