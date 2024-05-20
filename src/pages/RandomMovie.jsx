import { useNavigate } from 'react-router-dom';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchRandom } from '../redux/slices/randomMovieSlice';
import { deleteResult } from '../redux/slices/randomMovieSlice';

import { useForm } from 'react-hook-form';

import Slider from '@mui/material/Slider';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { selectIsAuth } from '../redux/slices/auth';

function RandomMovie() {
  const navigate = useNavigate();
  const { status, result, isLoading } = useSelector((state) => state.randomReducer);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [year, setYear] = React.useState([1970, 2024]);
  const [rating, setRating] = React.useState([0, 10]);
  const minDistanceYear = 1;
  const minDistanceRating = 0.1;

  const changeYear = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setYear((prevYear) => {
      if (activeThumb === 0) {
        return [Math.min(newValue[0], prevYear[1] - minDistanceYear), prevYear[1]];
      } else {
        return [prevYear[0], Math.max(newValue[1], prevYear[0] + minDistanceYear)];
      }
    });
  };

  const changeRating = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setRating((prevRating) => {
      if (activeThumb === 0) {
        return [Math.min(newValue[0], prevRating[1] - minDistanceRating), prevRating[1]];
      } else {
        return [prevRating[0], Math.max(newValue[1], prevRating[0] + minDistanceRating)];
      }
    });
  };

  React.useEffect(() => {
    setYear([1970, 2024]);
    setRating([0, 10]);
  }, []);

  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate, isAuth]);

  const onSubmit = (values) => {
    try {
      dispatch(
        fetchRandom({
          isSeries: values.type,
          year: year.join('-'),
          rating: rating.join('-'),
          genres: values.genre.toLowerCase(),
          country: values.country.charAt(0).toUpperCase() + values.country.slice(1),
          network: values.networks.charAt(0).toUpperCase() + values.networks.slice(1),
        }),
      );
    } catch (err) {
      console.error('Ошибка при запросе', err);
    }
  };

  React.useEffect(() => {
    if (status === 'success' && result !== null) {
      navigate(`/movie/${result.id}`);
      dispatch(deleteResult());
    }
  }, [status, result, navigate, dispatch]);

  return (
    <form
      className="row g-3 d-flex flex-column justify-content-center align-items-center "
      onSubmit={handleSubmit(onSubmit)}>
      <div className="col-auto">
        <label htmlFor="genre" className="visually">
          Жанр
        </label>
        <input
          type="genre"
          id="genre"
          {...register('genre', { required: false })}
          className="form-control"
          placeholder="Укажите жанр"
        />
      </div>
      <div className="col-auto">
        <label htmlFor="country" className="visually">
          Страна производства
        </label>
        <input
          type="country"
          id="country"
          {...register('country', { required: false })}
          className="form-control"
          placeholder="Укажите страну"
        />
      </div>
      <div className="col-auto">
        <label htmlFor="networks" className="visually">
          Сеть производства
        </label>
        <input
          type="networks"
          id="networks"
          {...register('networks', { required: false })}
          className="form-control"
          placeholder="Укажите сеть производства"
        />
      </div>
      <div className="col-auto">
        <label htmlFor="type" className="visually">
          Тип
        </label>
        <select
          type="type"
          id="type"
          {...register('type', { required: false })}
          className="form-select">
          <option value="">Выберите тип</option>
          <option value="false">Фильм</option>
          <option value="true">Сериал</option>
        </select>
      </div>
      <div className="w-50">
        <label htmlFor="year" className="visually">
          Год выпуска
        </label>
        <Slider
          id="year"
          min={1970}
          max={2024}
          getAriaLabel={() => 'Minimum distance'}
          value={year}
          onChange={changeYear}
          valueLabelDisplay="auto"
          disableSwap
        />
      </div>
      <div className="w-50">
        <label htmlFor="rating" className="visually">
          Рейтинг кинопоиска
        </label>
        <Slider
          id="rating"
          step={0.1}
          min={0}
          max={10}
          getAriaLabel={() => 'Minimum distance'}
          value={rating}
          onChange={changeRating}
          valueLabelDisplay="auto"
          disableSwap
        />
      </div>
      <div className="col-auto d-flex justify-content-center align-items-center flex-column">
        {isLoading && status === 'loading' ? (
          <Button className="btn btn-primary mb-3" variant="primary" disabled>
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            Loading...
          </Button>
        ) : status === 'error' || result === null ? (
          <>
            <button type="submit" className="btn btn-primary mb-3">
              Найти
            </button>
            <h4 style={{ color: 'red' }}>Ничего не найдено</h4>
          </>
        ) : (
          <button type="submit" className="btn btn-primary mb-3">
            Найти
          </button>
        )}
      </div>
    </form>
  );
}

export default RandomMovie;
