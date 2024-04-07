import React from 'react';
import axios from '../conf/axios.js';

import SceletonMovie from '../components/MovieBlock/SceletonMovie.jsx';
import MovieBlock from '../components/MovieBlock/index.jsx';
import Sort from '../components/Sort.jsx';

function Home() {
  const [Movies, setMovies] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  console.log(Movies);

  React.useEffect(() => {
    axios
      .get('/movie?page=1&limit=10&lists=top250')
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при получении фильмов:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <h2 className="content__title">Все фильмы</h2>
        <Sort />
      </div>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, id) => <SceletonMovie key={id} />)
          : Movies.docs.map((movie) => (
              <MovieBlock
                key={movie.id}
                id={movie.id}
                title={movie.name}
                imageUrl={movie.poster}
                year={movie.year}
                genre={movie.genres[0].name}
                rating={movie.rating.imdb}
              />
            ))}
      </div>
    </>
  );
}

export default Home;
