import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import SceletonMovie from '../components/MovieBlock/SceletonMovie.jsx';
import MovieBlock from '../components/MovieBlock/index.jsx';
import Sort from '../components/Sort.jsx';
import {
  setSortField,
  setSortType,
  setMoviePage,
  setMoviesPerPage,
  setFilters,
  setSearchHistory,
} from '../redux/slices/sortSlice.js';
import MyPagination from '../components/MyPagination.jsx';
import { sortList } from '../components/Sort.jsx';

import { fetchMovies } from '../redux/slices/moviesSlice.js';

import TryAgain from '../components/TryAgain.jsx';
import { incrementHomeAttempt } from '../redux/slices/moviesSlice';

function Home() {
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items: movies, status, attempts } = useSelector((state) => state.moviesReducer);
  const { sortField, sortType, moviePage, moviesPerPage, searchValue } = useSelector(
    (state) => state.sortReducer,
  );

  const dispatch = useDispatch();

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
    } finally {
      if (window.localStorage.getItem('searchHistory')) {
        dispatch(setSearchHistory(window.localStorage.getItem('searchHistory').split(',')));
      }
    }
  }, [dispatch, moviePage, sortField, sortType, searchValue, moviesPerPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      let sort = sortList.find((obj) => obj.sortProperty === params.sortField);

      if (sort === undefined) {
        sort = {
          name: 'году',
          sortProperty: 'year',
        };
      }

      if (![1, -1].includes(params.sortType)) {
        params.sortType = 1;
      }

      if (![10, 20, 30].includes(params.moviesPerPage)) {
        params.moviesPerPage = 10;
      }

      dispatch(setFilters({ ...params, sortField: sort }));
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchMoviesData();
    }

    isSearch.current = false;
  }, [fetchMoviesData, isSearch]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        moviePage,
        sortType,
        searchValue,
        moviesPerPage,
        sortField: sortField.sortProperty,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [dispatch, moviePage, sortType, sortField, searchValue, moviesPerPage, navigate]);

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
          <TryAgain
            action={fetchMoviesData}
            attempts={attempts}
            incrementFunction={() => dispatch(incrementHomeAttempt())}
          />
        ) : status === 'success' && movies.docs.length === 0 ? (
          <h3>Ничего не найдено</h3>
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
      <footer className="footer">
        {status === 'success' ? (
          <>
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
        ) : (
          ''
        )}
      </footer>
    </>
  );
}

export default Home;
