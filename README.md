# Инструкция по запуску
## Настройка перед запуском
В корневую папку надо добавить .env файл с переменной `REACT_APP_BACKEND_URL` и значением ссылки на сервер (если запускаете локально, то оно равно `http://localhost:4444`)

Также в папку `backend` следует добавить файл .env с переменными `PORT (опционально)`, `DB_CONN(ссылка на базу данных MongoDB)`, `SECRET_KEY(секретное слово для шифровки и расшифровки jwt)`, `TOKEN(ваш API токен кинопоиска`

API токен можно получить [тут](https://kinopoisk.dev)
## Локально

```bash
npm install
npm run start
```

Сервер запускается по адресу: http://localhost:7070

## С помощью docker'a

- С помощью команды `docker compose up` запускается приложение
- Сервер запускается также по адресу: http://localhost:7070


## Список отправляемых запросов

### https://api.kinopoisk.dev/v1.4/

- GET /movie с параметрами sortField, sortType, page, limit, notNullField, lists - выдача фильмов на главной странице
- GET /movie/search с параметрами page, limit, query - поиск фильмов
- GET /movie/{id} - информация о фильме
- GET /image с параметрами page, limit, movieId, selectFields - получение постеров
- GET /review с параметрами page, limit, movieId - отзывы на фильм/сериал
- GET /movie/random с параметрами isSeries, year, rating.kp, genres.name, countries.name, networks.items.name - получение рандомного фильма/сериала
