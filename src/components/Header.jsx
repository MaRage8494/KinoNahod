import { Link, useLocation } from 'react-router-dom';
import React from 'react';

import logoSvg from '../assets/img/camera-logo.svg';

import Search from './Search';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/sortSlice';

export default function Header() {
  let location = useLocation();

  const dispatch = useDispatch();
  const [path, setPath] = React.useState(location.pathname);
  React.useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const handleLogoClick = () => {
    console.log(location.search);
    console.log('location', window.location.search === '');
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
