import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import MyPagination from './MyPagination';

function Actors({ actors }) {
  const [active, setActive] = React.useState(1);

  if (!actors || !Array.isArray(actors) || actors.length === 0) {
    return <h2 className="stub">Нет информации об актёрах</h2>;
  }

  const uniqueActors = Array.from(new Set(actors.map((item) => item.id))).map((id) => {
    return actors.find((item) => item.id === id);
  });

  const pages =
    uniqueActors.length % 10 === 0 ? uniqueActors.length / 10 : uniqueActors.length / 10 + 1;

  const visibleActors = uniqueActors.slice((active - 1) * 10, active * 10);

  console.log(uniqueActors, pages, visibleActors);

  return (
    <>
      <div className="actors">
        {!actors || actors.length === 0 ? (
          <h2 className="stub">Нет информации об актёрах</h2>
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
      </div>
      <MyPagination
        pages={Math.floor(pages)}
        currentPage={active}
        setCurrentPage={(page) => setActive(page)}
      />
    </>
  );
}
export default Actors;
