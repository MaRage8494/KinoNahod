import React from 'react';
import axios from '../conf/axios.js';

import SceletonMovie from '../components/MovieBlock/SceletonMovie.jsx';
import MovieBlock from '../components/MovieBlock/index.jsx';
import Sort from '../components/Sort.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setSortField, setSortType } from '../redux/slices/sortSlice.js';

function Home() {
  const [Movies, setMovies] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const dispatch = useDispatch();
  const { sortField, sortType } = useSelector((state) => state.sortReducer);

  console.log(sortField);
  console.log(sortType);

  console.log(Movies);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`/movie?page=1&limit=10&lists=top250`, {
        params: {
          sortField: sortField.sortProperty,
          sortType: sortType,
        },
      })
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при получении фильмов:', err);
        setLoading(false);
      });
  }, [sortField, sortType]);

  return (
    <>
      <div className="content__top">
        <h2 className="content__title">Все фильмы</h2>
        <Sort
          value={sortField}
          method={sortType}
          onChangeSort={(field) => dispatch(setSortField(field))}
          onChangeType={(type) => dispatch(setSortType(type))}
        />
      </div>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, id) => <SceletonMovie key={id} />)
          : Movies.docs.map((movie) => (
              <MovieBlock
                key={movie.id}
                id={movie.id}
                title={movie.name}
                imageUrl={movie.poster || ''}
                year={movie.year}
                genre={movie.genres[0].name}
                rating={movie.rating.imdb || movie.rating.kp.toFixed(1)}
              />
            ))}
      </div>
    </>
  );
}

export default Home;
