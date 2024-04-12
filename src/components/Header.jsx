import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

import logoSvg from '../assets/img/camera-logo.svg';

import Search from './Search';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/slices/moviesSlice';
import { setFilters } from '../redux/slices/sortSlice';

export default function Header() {
  let location = useLocation();

  const dispatch = useDispatch();
  const [path, setPath] = React.useState(location.pathname);
  React.useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const handleLogoClick = () => {
    dispatch(
      setFilters({
        searchValue: '',
        sortField: 'year',
        sortType: 1,
        moviePage: 1,
        moviesPerPage: 10,
      }),
    );
  };
  return (
    <div className="header">
      <div className="container" onClick={handleLogoClick}>
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="CameraLogo" />
            <div>
              <h1>КиноНаход</h1>
              <p>Найди кино под вино</p>
            </div>
          </div>
        </Link>

        {path === '/' ? <Search /> : ''}
        <div className="header__login">
          <a href="/login.html" className="button button--login">
            <span>Войти</span>
          </a>
        </div>
      </div>
    </div>
  );
}
