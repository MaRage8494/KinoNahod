import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieBlock({ id, title, year, imageUrl, genre, rating }) {
  let type = 'normal';
  if (rating > 5 && rating < 7) {
    type = 'normal';
  } else if (rating >= 7 && rating <= 10) {
    type = 'high';
  } else {
    type = 'low';
  }
  return (
    <div className="movie-block">
      <div className={`movie-block__rating movie-block__rating--${type}`}>
        {rating % 1 === 0 ? `${rating}.0` : rating}
      </div>
      <Link to={`/movie/${id}`}>
        <img className="movie-block__image" src={imageUrl.previewUrl} alt="Movie" />
        <h4 className="movie-block__title">{title}</h4>
      </Link>
      <div className="movie-block__bottom">
        <div className="movie-block__year">{year},</div>
        <div className="movie-block__genre">{genre}</div>
      </div>
    </div>
  );
}
