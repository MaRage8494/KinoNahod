import logoSvg from '../assets/img/camera-logo.svg';

export default function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img width="38" src={logoSvg} alt="CameraLogo" />
          <div>
            <h1>КиноНаход</h1>
            <p>Найди кино под вино</p>
          </div>
        </div>
        <div className="header__login">
          <a href="/login.html" className="button button--login">
            <span>Войти</span>
          </a>
        </div>
      </div>
    </div>
  );
}
