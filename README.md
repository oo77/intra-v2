# INTRA - Deploy Guide

## Структура проекта

```
server/
├── config/
│   └── database.js      # Подключение к MySQL
├── migrations/
│   └── schema.sql       # Схема базы данных
├── routes/
│   ├── team-members.js  # API команды
│   ├── projects.js      # API проектов
│   ├── gallery.js       # API галереи  
│   └── partners.js      # API партнёров
└── index.js             # Главный файл сервера
```

## Деплой на ahost

### 1. Подготовка базы данных

1. Войдите в phpMyAdmin на ahost
2. Создайте базу данных (если ещё нет)
3. Импортируйте файл `server/migrations/schema.sql`

### 2. Настройка переменных окружения

Создайте файл `.env` на сервере:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=ваш_пользователь_бд
DB_PASSWORD=ваш_пароль_бд
DB_NAME=имя_базы_данных
PORT=3001
NODE_ENV=production
VITE_API_URL=https://ваш-домен.uz/api
```

### 3. Запуск

```bash
# Установка зависимостей
npm install

# Сборка frontend
npm run build

# Запуск сервера
npm run server
```

### 4. Для PM2 (рекомендуется)

```bash
pm2 start server/index.js --name "intra-api"
pm2 save
```

## Локальная разработка

```bash
# Запуск frontend + backend вместе
npm run start:all

# Или по отдельности:
npm run dev      # Frontend (Vite)
npm run server   # Backend (Node.js)
```

## API Endpoints

| Метод  | Endpoint           | Описание              |
|--------|--------------------|-----------------------|
| GET    | /api/team          | Все члены команды     |
| POST   | /api/team          | Добавить члена        |
| PUT    | /api/team/:id      | Обновить члена        |
| DELETE | /api/team/:id      | Удалить члена         |
| GET    | /api/projects      | Все проекты           |
| POST   | /api/projects      | Добавить проект       |
| PUT    | /api/projects/:id  | Обновить проект       |
| DELETE | /api/projects/:id  | Удалить проект        |
| GET    | /api/gallery       | Все изображения       |
| POST   | /api/gallery       | Добавить изображение  |
| PUT    | /api/gallery/:id   | Обновить изображение  |
| DELETE | /api/gallery/:id   | Удалить изображение   |
| GET    | /api/partners      | Все партнёры          |
| POST   | /api/partners      | Добавить партнёра     |
| PUT    | /api/partners/:id  | Обновить партнёра     |
| DELETE | /api/partners/:id  | Удалить партнёра      |
| GET    | /api/health        | Проверка состояния    |
