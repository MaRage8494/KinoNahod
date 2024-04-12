import CryptoJS from 'crypto-js';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/slices/loginSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = React.useState(false);
  const user = { email: 'marat2003@mail.ru', password: 'bebra2003' };

  const key = 'bebra2003';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'marat2003@mail.ru',
      password: 'bebra2003',
    },
    mode: 'onChange',
  });

  const onSubmit = (values) => {
    console.log(values);

    if (values.email === user.email && values.password === user.password) {
      const dataString = JSON.stringify(values);
      const encryptedData = CryptoJS.AES.encrypt(dataString, key).toString();
      console.log(encryptedData);
      window.localStorage.setItem('token', encryptedData);
      dispatch(setToken(window.localStorage.setItem('token', encryptedData)));

      navigate('/');
    } else {
      setLoginError(true);
    }
  };
  return (
    <div className="login">
      <h2>Авторизация</h2>
      <form
        className="row g-3 d-flex flex-column justify-content-center align-items-center "
        onSubmit={handleSubmit(onSubmit)}>
        <div className="col-auto">
          <label htmlFor="email" className="visually-hidden">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="form-control"
            placeholder="Email"
          />
          {errors.email && <span>Данное поле обязательно</span>}
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
          {loginError && <div style={{ color: 'red' }}>Неправильные данные</div>}
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
