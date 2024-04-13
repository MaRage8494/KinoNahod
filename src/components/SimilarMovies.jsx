import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import { Link } from 'react-router-dom';

function SimilarMovies({ movies }) {
  console.log(movies);
  if (!movies || movies.length === 0) {
    return <h2 className="stub">Нет информации о похожих фильмах</h2>;
  }
  return (
    <>
      <Carousel className="carousel--similar carousel" data-bs-theme="dark">
        {movies.map((movie) => (
          <Carousel.Item className="carousel__item" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={movie.poster.previewUrl}
                alt={movie.name}
                className="d-block w-100 carousel__image"
              />
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default SimilarMovies;
