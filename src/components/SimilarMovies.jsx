import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import { Link } from 'react-router-dom';

function SimilarMovies({ movies }) {
  console.log(movies);
  return (
    <div className="similar">
      <h1 className="carousel__title">Похожие фильмы</h1>
      <Carousel className="carousel carousel--similar" data-bs-theme="light">
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
    </div>
  );
}

export default SimilarMovies;
