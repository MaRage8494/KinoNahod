import axios from '../conf/axios.js';
import { useParams } from 'react-router-dom';
import env from 'react-dotenv';

import React from 'react';

function Movie() {
  const { id } = useParams();
  const [Movie, setMovie] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  console.log(Movie);
  console.log(env.PORT);

  React.useEffect(() => {
    axios
      .get(`/movie/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при получении фильмов:', err);
        setLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <div className="info-wrapper">
      <div className="info-poster">
        <img src={Movie.poster.previewUrl} alt={Movie.title} />
      </div>
    </div>
  );
}

export default Movie;
