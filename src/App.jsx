import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import Movie from './pages/Movie';
import NotFound from './pages/NotFound';
import React from 'react';
import RandomMovie from './pages/RandomMovie';
import { Login } from './pages/Login/index.jsx';
import { Registration } from './pages/Registration/index.jsx';
import { fetchAuthMe } from './redux/slices/auth';
import { useDispatch } from 'react-redux';

export default function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/random" element={<RandomMovie />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
