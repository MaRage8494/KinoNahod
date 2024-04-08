import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';

function Actors({ actors }) {
  const [active, setActive] = React.useState(0);

  if (!actors || !Array.isArray(actors) || actors.length === 0) {
    return <h2>Нет информации об актёрах</h2>;
  }

  const uniqueActors = Array.from(new Set(actors.map((item) => item.id))).map((id) => {
    return actors.find((item) => item.id === id);
  });

  const pages =
    uniqueActors.length % 10 === 0 ? uniqueActors.length / 10 : uniqueActors.length / 10 + 1;

  const visibleActors = uniqueActors.slice(active * 10, (active + 1) * 10);

  console.log(visibleActors);

  return (
    <div className="actors">
      {!actors || actors.length === 0 ? (
        <h2>Нет информации об актёрах</h2>
      ) : (
        <ListGroup className="actors__list" variant="flush">
          {visibleActors.map((actor) => (
            <ListGroup.Item className="actors__list-item" key={actor.id}>
              <img className="actors__image" src={actor.photo} alt={actor.name} />
              <h3 className="actors__name">{actor.name || actor.enName}</h3>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {pages > 1 ? (
        <Pagination className="pagination pagination--actors">
          {[...new Array(Math.floor(pages))].map((_, i) => (
            <Pagination.Item
              className="pagination__item"
              key={i + 1}
              onClick={() => setActive(i)}
              active={active === i}>
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
