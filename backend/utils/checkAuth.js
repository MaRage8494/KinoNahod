import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, ''); //? Получение токена из заголовка запроса и избавление от Bearer в начале строки

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY); //? Расшифровка токена

      req.userId = decoded._id; //? Добавление поля userId в запрос

      next(); //? Допуск к следующей функции
    } catch (err) {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};
export default checkAuth;
