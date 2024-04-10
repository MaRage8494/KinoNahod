import { Link, useLocation } from 'react-router-dom';
import React from 'react';

import logoSvg from '../assets/img/camera-logo.svg';

import Search from './Search';

export default function Header() {
  let location = useLocation();
  const [path, setPath] = React.useState(location.pathname);
  React.useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <div className="header">
      <div className="container">
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
