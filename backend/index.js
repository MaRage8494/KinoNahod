import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import cors from 'cors';

import { registerValidation, loginValidation } from './validations/auth.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';

import { UserController, MovieController } from './controllers/index.js';

mongoose
  .connect(process.env.DB_CONN)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err)); //? Подключение к БД

const app = express(); //? Использование app в качестве управление express

app.use(express.json()); //? Делает так, чтобы express мог читать JSON файлы, которые ему отправляют
app.use(cors());

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login); //? Запрос на авторизацию, добавляем дополнительно валидатор для проверки
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register); //? Запрос на регистрацию, добавляем дополнительно валидатор для проверки
app.get('/auth/me', checkAuth, UserController.getMe); //? Запрос на выдачу данных пользователя, добавляем дополнительно проверку актуальности авторизации

app.get('/movies', MovieController.getAllMovies); //? Получение всех фильмов
app.get('/movies/search', MovieController.getSearch); //? Поиск фильмов
app.get('/movie/:id', MovieController.getMovie); //? Получение фильма
app.get('/reviews', MovieController.getReviews); //? Получение отзывов
app.get('/random', MovieController.getRandom); //? Получение рандомного фильма

const port = process.env.PORT || 4444;
app.listen(port, (err) => {
  //? Включаем сервер на порту, если будет ошибка, то она выведется
  if (err) {
    return console.log(err);
  } else {
    return console.log('Server OK');
  }
});
