import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

import logoSvg from '../assets/img/camera-logo.svg';

import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/slices/sortSlice';
import { logout, selectIsAuth } from '../redux/slices/auth.js';

export default function Header() {
  let location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [path, setPath] = React.useState(location.pathname);
  React.useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const onClickLogout = () => {
    if (window.confirm('Вы точно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/');
    }
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
    <header className="header">
      <div className="container">
        <Link
          to="/"
          onClick={handleLogoClick}
          style={{
            display: 'grid',
            gridArea: 'logo',
          }}>
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="CameraLogo" />
            <div>
              <h1>КиноНаход</h1>
              <p>Найди кино под вино</p>
            </div>
          </div>
        </Link>

        {path === '/' ? <Search /> : ''}
        {isAuth ? (
          <div className="header__login">
            <Link to="/random" className="button button--random">
              <span>Рандомный фильм</span>
            </Link>
            <div onClick={() => onClickLogout()} className="button button--logout">
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
    </header>
  );
}
