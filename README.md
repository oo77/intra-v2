# INTRA - Руководство по деплою

## 📁 Структура проекта

```
intra-v2/
├── server/
│   ├── config/
│   │   └── database.js      # Подключение к MySQL
│   ├── migrations/
│   │   └── schema.sql       # Схема базы данных
│   ├── routes/
│   │   ├── team-members.js  # API команды
│   │   ├── projects.js      # API проектов
│   │   ├── gallery.js       # API галереи
│   │   └── partners.js      # API партнёров
│   └── index.js             # Главный файл сервера
├── dist/                    # Скомпилированный frontend (после build)
├── src/                     # Исходный код frontend
├── ecosystem.config.cjs     # Конфигурация PM2
└── .env.example             # Пример переменных окружения
```

---

## 🚀 Деплой на VPS/Хостинг

### 1. Требования

- **Node.js** >= 18.x
- **MySQL** >= 5.7 или 8.x
- **PM2** (рекомендуется для production)
- **Nginx** (опционально, для reverse proxy)

### 2. Подготовка базы данных

1. Войдите в phpMyAdmin или консоль MySQL
2. Создайте базу данных:
   ```sql
   CREATE DATABASE intra_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Импортируйте схему:
   ```bash
   mysql -u user -p intra_db < server/migrations/schema.sql
   ```

### 3. Настройка переменных окружения

Скопируйте `.env.example` в `.env` и заполните:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=intra_db

# Server
PORT=3001
NODE_ENV=production

# Frontend API URL
VITE_API_URL=https://your-domain.uz/api
```

### 4. Установка и сборка

```bash
# Клонирование (если ещё не сделано)
git clone <repo-url>
cd intra-v2

# Установка зависимостей
npm install

# Сборка frontend
npm run build
```

### 5. Запуск

#### Вариант A: Простой запуск
```bash
npm start
```

#### Вариант B: С PM2 (рекомендуется)
```bash
# Установить PM2 глобально
npm install -g pm2

# Запустить приложение
pm2 start ecosystem.config.cjs --env production

# Сохранить конфигурацию для автозапуска
pm2 save
pm2 startup
```

#### Управление PM2
```bash
pm2 status           # Статус процессов
pm2 logs intra-api   # Логи
pm2 restart intra-api # Перезапуск
pm2 stop intra-api   # Остановка
pm2 delete intra-api # Удаление
```

### 6. Настройка Nginx (опционально)

```nginx
server {
    listen 80;
    server_name your-domain.uz;

    # Редирект на HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.uz;

    # SSL сертификаты (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.uz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.uz/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 💻 Локальная разработка

```bash
# Запуск frontend + backend вместе
npm run start:all

# Или по отдельности:
npm run dev         # Frontend (Vite) - http://localhost:5173
npm run server:dev  # Backend (Node.js) - http://localhost:3001
```

---

## 📡 API Endpoints

| Метод  | Endpoint           | Описание                |
|--------|--------------------|-----------------------  |
| GET    | /api/team          | Все члены команды       |
| POST   | /api/team          | Добавить члена          |
| PUT    | /api/team/:id      | Обновить члена          |
| DELETE | /api/team/:id      | Удалить члена           |
| GET    | /api/projects      | Все проекты             |
| POST   | /api/projects      | Добавить проект         |
| PUT    | /api/projects/:id  | Обновить проект         |
| DELETE | /api/projects/:id  | Удалить проект          |
| GET    | /api/gallery       | Все изображения         |
| POST   | /api/gallery       | Добавить изображение    |
| PUT    | /api/gallery/:id   | Обновить изображение    |
| DELETE | /api/gallery/:id   | Удалить изображение     |
| GET    | /api/partners      | Все партнёры            |
| POST   | /api/partners      | Добавить партнёра       |
| PUT    | /api/partners/:id  | Обновить партнёра       |
| DELETE | /api/partners/:id  | Удалить партнёра        |
| GET    | /api/health        | Проверка состояния      |

---

## ✅ Чеклист деплоя

- [ ] База данных создана и схема импортирована
- [ ] `.env` файл настроен с правильными данными
- [ ] `npm install` выполнен
- [ ] `npm run build` выполнен успешно
- [ ] Сервер запущен через PM2
- [ ] Nginx настроен (если используется)
- [ ] SSL сертификат установлен
- [ ] `/api/health` возвращает `database: connected`

---

## 🔧 Troubleshooting

### Ошибка подключения к БД
```bash
# Проверьте переменные окружения
cat .env

# Проверьте подключение к MySQL
mysql -u $DB_USER -p -h $DB_HOST $DB_NAME
```

### Приложение не стартует
```bash
# Проверьте логи PM2
pm2 logs intra-api --lines 50

# Или запустите напрямую для отладки
NODE_ENV=production node server/index.js
```

### Статика не отдаётся
```bash
# Убедитесь, что dist/ существует
ls -la dist/

# Пересоберите frontend
npm run build
```
