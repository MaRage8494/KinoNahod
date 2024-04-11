import React from 'react';

import SceletonMovie from '../components/MovieBlock/SceletonMovie.jsx';
import MovieBlock from '../components/MovieBlock/index.jsx';
import Sort from '../components/Sort.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setSortField, setSortType } from '../redux/slices/sortSlice.js';
import MyPagination from '../components/MyPagination.jsx';
import { setMoviePage, setMoviesPerPage } from '../redux/slices/pagesSlice.js';
import { fetchMovies } from '../redux/slices/moviesSlice.js';
import TryAgain from '../components/TryAgain.jsx';

function Home() {
  const { items: movies, status, attempts } = useSelector((state) => state.moviesReducer);
  const { sortField, sortType } = useSelector((state) => state.sortReducer);
  const { moviePage, moviesPerPage } = useSelector((state) => state.pagesReducer);
  const { searchValue } = useSelector((state) => state.searchReducer);

  console.log('attempt', attempts);
  console.log('status', status);

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
          moviesPerPage,
        }),
      );
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Ошибка при получении фильмов:', err);
    }
  }, [dispatch, moviePage, sortField, sortType, searchValue, moviesPerPage]);

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
        {status === 'loading' ? (
          [...new Array(10)].map((_, id) => <SceletonMovie key={id} />)
        ) : status === 'error' ? (
          <TryAgain action={fetchMoviesData} attempts={attempts} />
        ) : (
          movies.docs.map((movie) => (
            <MovieBlock
              key={movie.id}
              id={movie.id}
              title={movie.name || movie.enName || movie.alternativeName}
              imageUrl={movie.poster || 'https://st.kp.yandex.net/images/no-poster.gif'}
              year={movie.year || 'год не указан'}
              genre={movie.genres.length === 0 ? 'жанр не указан' : movie.genres[0].name}
              rating={movie.rating.imdb || movie.rating.kp.toFixed(0)}
            />
          ))
        )}
      </div>
      <MyPagination
        pages={movies.pages}
        currentPage={moviePage}
        setCurrentPage={(page) => dispatch(setMoviePage(page))}
      />
      <div className="moviePerPage">
        <p className="moviePerPage__title">Фильмов на странице:</p>
        <p
          className={`pageCount ${moviesPerPage === 10 ? 'pageCount--active' : ''}`}
          onClick={() => dispatch(setMoviesPerPage(10))}>
          10
        </p>
        <p
          className={`pageCount ${moviesPerPage === 20 ? 'pageCount--active' : ''}`}
          onClick={() => dispatch(setMoviesPerPage(20))}>
          20
        </p>
        <p
          className={`pageCount ${moviesPerPage === 30 ? 'pageCount--active' : ''}`}
          onClick={() => dispatch(setMoviesPerPage(30))}>
          30
        </p>
      </div>
    </>
  );
}

export default Home;
