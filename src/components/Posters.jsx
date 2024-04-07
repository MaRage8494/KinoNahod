import Carousel from 'react-bootstrap/Carousel';
import React from 'react';

function Posters({ posters }) {
  console.log(posters);
  return (
    <div className="posters">
      <h1 className="carousel__title">Постеры</h1>
      <Carousel className="carousel carousel--posters" data-bs-theme="light">
        {posters.docs.map((poster) => (
          <Carousel.Item key={poster.id}>
            <img
              src={poster.previewUrl}
              alt={poster.name}
              className="d-block w-100 carousel__image"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Posters;
