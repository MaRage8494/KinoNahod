import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import Movie from './pages/Movie';

export default function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<Movie />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
