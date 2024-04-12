import { Link, useLocation } from 'react-router-dom';
import React from 'react';

import logoSvg from '../assets/img/camera-logo.svg';

import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../redux/slices/loginSlice';
import { setFilters } from '../redux/slices/sortSlice';

export default function Header() {
  let location = useLocation();

  const { token } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [path, setPath] = React.useState(location.pathname);
  React.useEffect(() => {
    setPath(location.pathname);
    dispatch(setToken(window.localStorage.getItem('token')));
  }, [location.pathname, dispatch]);

  const logoutHandler = () => {
    window.localStorage.removeItem('token');
    dispatch(setToken(''));
  };

  const handleLogoClick = () => {
    if (location.search !== '') {
      dispatch(
        setFilters({
          searchValue: '',
          sortField: { name: 'году', sortProperty: 'year' },
          sortType: 1,
          moviePage: 1,
          moviesPerPage: 10,
        }),
      );
    }
  };
  return (
    <div className="header">
      <div className="container">
        <Link to="/" onClick={handleLogoClick}>
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="CameraLogo" />
            <div>
              <h1>КиноНаход</h1>
              <p>Найди кино под вино</p>
            </div>
          </div>
        </Link>

        {path === '/' ? <Search /> : ''}
        {token ? (
          <div className="header__login">
            <Link to="/random" className="button button--random">
              <span>Рандомный фильм</span>
            </Link>
            <div onClick={() => logoutHandler()} className="button button--logout">
              <span>Выйти</span>
            </div>
          </div>
        ) : (
          <div className="header__login">
            <Link to="/login" className="button button--login">
              <span>Войти</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
