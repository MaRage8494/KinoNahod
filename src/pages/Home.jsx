import React from 'react';

import SceletonMovie from '../components/MovieBlock/SceletonMovie.jsx';
import MovieBlock from '../components/MovieBlock/index.jsx';
import Sort from '../components/Sort.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setSortField, setSortType } from '../redux/slices/sortSlice.js';
import MyPagination from '../components/MyPagination.jsx';
import { setMoviePage } from '../redux/slices/pagesSlice.js';
import { fetchMovies } from '../redux/slices/moviesSlice.js';

function Home() {
  const { items: movies, status } = useSelector((state) => state.moviesReducer);
  const { sortField, sortType } = useSelector((state) => state.sortReducer);
  const { moviePage } = useSelector((state) => state.pagesReducer);
  const { searchValue } = useSelector((state) => state.searchReducer);

  const dispatch = useDispatch();

  console.log(movies);

  const fetchMoviesData = React.useCallback(async () => {
    try {
      dispatch(
        fetchMovies({
          moviePage,
          sortField: sortField.sortProperty,
          sortType,
          searchValue,
        }),
      );
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Ошибка при получении фильмов:', err);
    }
  }, [dispatch, moviePage, sortField, sortType, searchValue]);

  React.useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]);

  return (
    <>
      <div className="content__top">
        <h2 className="content__title">Все фильмы</h2>
        {searchValue ? (
          ''
        ) : (
          <Sort
            value={sortField}
            method={sortType}
            onChangeSort={(field) => dispatch(setSortField(field))}
            onChangeType={(type) => dispatch(setSortType(type))}
          />
        )}
      </div>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(10)].map((_, id) => <SceletonMovie key={id} />)
          : movies.docs.map((movie) => (
              <MovieBlock
                key={movie.id}
                id={movie.id}
                title={movie.name || movie.enName || movie.alternativeName}
                imageUrl={movie.poster || 'https://st.kp.yandex.net/images/no-poster.gif'}
                year={movie.year || 'год не указан'}
                genre={movie.genres.length === 0 ? 'жанр не указан' : movie.genres[0].name}
                rating={movie.rating.imdb || movie.rating.kp.toFixed(0)}
              />
            ))}
      </div>
      <MyPagination
        pages={movies.pages}
        currentPage={moviePage}
        setCurrentPage={(page) => dispatch(setMoviePage(page))}
      />
    </>
  );
}

export default Home;
