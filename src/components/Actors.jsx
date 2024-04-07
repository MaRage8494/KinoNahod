import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';

function Actors({ actors }) {
  const [active, setActive] = React.useState(0);
  const pages = actors.length % 10 === 0 ? actors.length / 10 : actors.length / 10 + 1;
  const uniqueActors = Array.from(new Set(actors.map((item) => item.id))).map((id) => {
    return actors.find((item) => item.id === id);
  });
  const visibleActors = uniqueActors.slice(active * 10, (active + 1) * 10);

  return (
    <div className="actors">
      <h2 className="actors__title">Актёрский состав:</h2>
      {visibleActors.length > 0 ? (
        <ListGroup className="actors__list" variant="flush">
          {visibleActors.map((actor) => (
            <ListGroup.Item className="actors__list-item" key={actor.id}>
              <img className="actors__image" src={actor.photo} alt={actor.name} />
              <h3 className="actors__name">{actor.name || actor.enName}</h3>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <h2>Нет информации об актёрах</h2>
      )}
      {pages > 1 ? (
        <Pagination className="pagination pagination--actors">
          {[...new Array(Math.floor(pages))].map((_, i) => (
            <Pagination.Item key={i + 1} onClick={() => setActive(i)} active={active === i}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      ) : (
        ''
      )}
    </div>
  );
}

export default Actors;
