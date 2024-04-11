import React from 'react';
import axios from '../conf/axios.js';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import MovieInfo from '../components/MovieInfo.jsx';
import SimilarMovies from '../components/SimilarMovies.jsx';
import Posters from '../components/Posters.jsx';
import Actors from '../components/Actors.jsx';
import Reviews from '../components/Reviews.jsx';

// import euphoria from './euphoria.json';
import Series from '../components/Series.jsx';

function Movie() {
  const { id } = useParams();
  const [movieData, setMovieData] = React.useState([]);
  const [posters, setPosters] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const movieResponse = await axios.get(`/movie/${id}`);
        setMovieData(movieResponse.data);

        const postersResponse = await axios.get(
          `/image?page=1&limit=10&selectFields=previewUrl&movieId=${id}`,
        );
        setPosters(postersResponse.data);

        const reviewsResponse = await axios.get(`review?page=1&limit=5&movieId=${id}`);
        setReviews(reviewsResponse.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  console.log(movieData);

  // console.log(euphoria);
  // React.useEffect(() => {
  //   setMovieData(euphoria);
  //   setLoading(false);
  // }, []);

  return (
    <>
      {isLoading ? (
        <h1>Загрузка...</h1>
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
              <Posters posters={posters} />
            </div>
            <div className="similar">
              <h1 className="carousel__title">Похожие фильмы</h1>
              <SimilarMovies movies={movieData.similarMovies} />
            </div>
          </div>
          <h2 className="reviews__title">Отзывы пользователей</h2>
          <Reviews reviews={reviews} pages={reviews.pages} movieId={id} />
        </>
      )}
    </>
  );
}

export default Movie;
