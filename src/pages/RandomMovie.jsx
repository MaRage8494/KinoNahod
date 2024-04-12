import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

function RandomMovie() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  console.log(token);
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    console.log('token', token);
  }, [navigate, token]);

  const [genre, setGenre] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [contentType, setContentType] = React.useState('');
  const [releaseYear, setReleaseYear] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [productionNetwork, setProductionNetwork] = React.useState('');

  const onSubmit = () => {
    // Реализация логики поиска рандомного фильма с учетом выбранных фильтров
    console.log('Поиск рандомного фильма с учетом фильтров:');
    console.log('Жанр:', genre);
    console.log('Страна:', country);
    console.log('Тип контента:', contentType);
    console.log('Год выпуска:', releaseYear);
    console.log('Рейтинг:', rating);
    console.log('Сеть производства:', productionNetwork);
  };

  return (
    <form
      className="row g-3 d-flex flex-column justify-content-center align-items-center "
      onSubmit={handleSubmit(onSubmit)}>
      <div className="col-auto">
        <input
          type="genre"
          id="genre"
          {...register('genre', { required: true })}
          className="form-control"
          placeholder="Укажите жанр"
        />
        {errors.genre && <span>Данное поле обязательно</span>}
      </div>
      <div className="col-auto">
        <label htmlFor="password" className="visually-hidden">
          Password
        </label>
        <input
          type="password"
          {...register('password', { required: true })}
          className="form-control"
          id="password"
          placeholder="Password"
        />
        {errors.password && <span>Данное поле обязательно</span>}
        {/* {loginError && <div style={{ color: 'red' }}>Неправильные данные</div>} */}
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">
          Войти
        </button>
      </div>
    </form>
  );
}

export default RandomMovie;
