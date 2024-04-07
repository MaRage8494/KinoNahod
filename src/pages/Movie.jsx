import React from 'react';
import axios from '../conf/axios.js';
import { useParams } from 'react-router-dom';

import MovieInfo from '../components/MovieInfo.jsx';
import SimilarMovies from '../components/SimilarMovies.jsx';
import Posters from '../components/Posters.jsx';

function Movie() {
  const { id } = useParams();
  const [movieData, setMovieData] = React.useState([]);
  const [posters, setPosters] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  //   console.log(Movie);
  //   console.log(env.PORT);

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
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  console.log(Movie);

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <>
      {isLoading ? (
        <h1>Загрузка...</h1>
      ) : (
        <>
          <MovieInfo
            poster={movieData.poster.url}
            name={movieData.name}
            description={movieData.description}
            rating={movieData.rating.imdb}
          />
          {movieData.type === 'movie' ? '' : <div className="series"></div>}
          <div className="carousels">
            <Posters posters={posters} />
            <SimilarMovies movies={movieData.similarMovies} />
          </div>
        </>
      )}
    </>
  );
}

export default Movie;
