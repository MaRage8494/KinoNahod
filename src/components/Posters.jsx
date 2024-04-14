import Carousel from 'react-bootstrap/Carousel';
import React from 'react';

function Posters({ posters }) {
  if (!posters || !Array.isArray(posters.docs) || posters.docs.length === 0) {
    return <h2 className="stub">Нет информации о постерах</h2>;
  }
  return (
    <Carousel className="carousel carousel--posters" data-bs-theme="dark">
      {posters.docs.map((poster) => (
        <Carousel.Item key={poster.id} className="carousel__image-block">
          <img src={poster.previewUrl} alt={poster.name} className="d-flex carousel__image" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Posters;
