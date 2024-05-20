# Используем образ с Node.js и Alpine Linux
FROM node:22.1.0-alpine

# Установка необходимых пакетов для сборки bcrypt и обновление npm
RUN apk add --no-cache build-base python3 python3-dev \
    && npm install -g npm \
    && npm cache clean --force

# Создание рабочей директории и копирование файлов приложения
WORKDIR /app
COPY package.json package-lock.json ./

# Установка зависимостей приложения
RUN npm install

# Добавление остальных файлов приложения
COPY . .

# Попытка пересборки модуля bcrypt
RUN npm rebuild bcrypt --build-from-source

# Команда для запуска вашего приложения (замените на свою)
CMD ["npm", "start"]
