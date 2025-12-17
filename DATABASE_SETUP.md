# 🚀 INTRA V2 - Интеграция с MySQL базой данных

## 📋 Обзор

Проект теперь полностью интегрирован с MySQL базой данных. Все данные (команда, проекты, галерея) хранятся в БД и управляются через REST API.

## 🏗️ Архитектура

```
Frontend (Vue 3 + Pinia) ←→ Backend API (Express) ←→ MySQL Database
```

### Технологии:
- **Frontend**: Vue 3, Pinia, Axios, Vue Router, i18n
- **Backend**: Node.js, Express, MySQL2
- **Database**: MySQL 8.0+
- **Image Storage**: Cloudinary (SEO-оптимизированные изображения)

## 📁 Структура проекта

```
intra-v2/
├── server/                    # Backend API
│   ├── config/
│   │   └── database.js       # Подключение к MySQL
│   ├── routes/
│   │   ├── team.js           # API для команды
│   │   ├── projects.js       # API для проектов
│   │   └── gallery.js        # API для галереи
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   └── run-migrations.js
│   └── index.js              # Главный файл сервера
├── src/
│   ├── api/
│   │   └── client.js         # Axios клиент
│   ├── stores/               # Pinia stores
│   │   ├── team.js
│   │   ├── projects.js
│   │   └── gallery.js
│   ├── utils/
│   │   └── imageUpload.js    # Cloudinary интеграция
│   └── views/
│       ├── TeamAdmin.vue
│       ├── ProjectsAdmin.vue
│       └── GalleryAdmin.vue
└── .env                      # Конфигурация
```

## ⚙️ Настройка

### 1. Конфигурация базы данных

Файл `.env` уже настроен с вашими данными:

```env
DB_HOST=83.69.139.250
DB_PORT=3306
DB_USER=intrauz1_admin
DB_PASSWORD=ozodbek1399
DB_NAME=intrauz1_main
```

### 2. Запуск миграций

Создайте таблицы в базе данных:

```bash
npm run migrate
```

Это создаст следующие таблицы:
- `team_members` - члены команды
- `team_members_i18n` - переводы для команды
- `team_members_arrays` - массивы данных (expertise, education, etc.)
- `projects` - проекты
- `projects_i18n` - переводы для проектов
- `projects_arrays` - массивы данных (objectives, technologies)
- `gallery_images` - изображения галереи
- `gallery_images_i18n` - переводы для галереи
- `contact_messages` - контактные сообщения

### 3. Настройка Cloudinary

1. Зарегистрируйтесь на https://cloudinary.com (бесплатно)
2. Получите:
   - Cloud Name
   - API Key
   - API Secret
   - Upload Preset (создайте Unsigned Upload Preset)

3. Обновите файлы:

**.env** (backend):
```env
CLOUDINARY_CLOUD_NAME=ваш_cloud_name
CLOUDINARY_API_KEY=ваш_api_key
CLOUDINARY_API_SECRET=ваш_api_secret
```

**src/utils/imageUpload.js** (frontend):
```javascript
const CLOUDINARY_CLOUD_NAME = 'ваш_cloud_name'
const CLOUDINARY_UPLOAD_PRESET = 'ваш_upload_preset'
```

## 🚀 Запуск проекта

### Вариант 1: Запуск всего сразу

```bash
npm run start:all
```

Это запустит:
- Frontend на `http://localhost:5173`
- Backend API на `http://localhost:3001`

### Вариант 2: Раздельный запуск

**Терминал 1 - Frontend:**
```bash
npm run dev
```

**Терминал 2 - Backend:**
```bash
npm run server:dev
```

## 📡 API Endpoints

### Команда
- `GET /api/team` - Получить всех членов команды
- `POST /api/team` - Создать/обновить члена команды
- `DELETE /api/team/:id` - Удалить члена команды

### Проекты
- `GET /api/projects` - Получить все проекты
- `POST /api/projects` - Создать/обновить проект
- `DELETE /api/projects/:id` - Удалить проект

### Галерея
- `GET /api/gallery` - Получить галерею
- `POST /api/gallery` - Создать/обновить изображение
- `DELETE /api/gallery/:id` - Удалить изображение
- `PUT /api/gallery/reorder` - Изменить порядок изображений

### Здоровье
- `GET /api/health` - Проверка состояния API и БД

## 🎨 Использование в компонентах

### Пример с Pinia Store:

```vue
<script setup>
import { useTeamStore } from '@/stores/team'
import { onMounted } from 'vue'

const teamStore = useTeamStore()

onMounted(async () => {
  // Загрузить данные из БД
  await teamStore.fetchMembers()
})

// Сохранить члена команды
async function saveMember(memberData) {
  try {
    await teamStore.saveMember(memberData)
    alert('✅ Сохранено в базу данных!')
  } catch (error) {
    alert('❌ Ошибка: ' + error.message)
  }
}

// Удалить члена команды
async function deleteMember(id) {
  try {
    await teamStore.deleteMember(id)
    alert('✅ Удалено из базы данных!')
  } catch (error) {
    alert('❌ Ошибка: ' + error.message)
  }
}
</script>

<template>
  <div>
    <div v-if="teamStore.isLoading">Загрузка...</div>
    <div v-else-if="teamStore.hasError">Ошибка: {{ teamStore.error }}</div>
    <div v-else>
      <div v-for="member in teamStore.membersList" :key="member.id">
        {{ member.ru.name }}
      </div>
    </div>
  </div>
</template>
```

## 🔄 Миграция данных из JSON

Если у вас уже есть данные в JSON файлах, создайте скрипт для импорта:

```javascript
// server/scripts/import-from-json.js
const fs = require('fs');
const { teamAPI } = require('../api/client');

async function importTeamData() {
  const data = JSON.parse(fs.readFileSync('./public/team-members.json', 'utf8'));
  
  for (const [id, member] of Object.entries(data)) {
    await teamAPI.create(member);
    console.log(`✅ Импортирован: ${member.ru.name}`);
  }
}

importTeamData();
```

## 🌐 Деплой на хостинг

### 1. Подготовка

```bash
# Собрать frontend
npm run build

# Файлы будут в папке dist/
```

### 2. Настройка на хостинге

**Обновите .env для продакшена:**

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=intrauz1_admin
DB_PASSWORD=ozodbek1399
DB_NAME=intrauz1_main

NODE_ENV=production
PORT=3001
FRONTEND_URL=https://ваш-домен.uz
```

### 3. Запуск на сервере

```bash
# Установить зависимости
npm install --production

# Запустить миграции
npm run migrate

# Запустить сервер
npm run server
```

### 4. Nginx конфигурация

```nginx
server {
    listen 80;
    server_name ваш-домен.uz;

    # Frontend
    location / {
        root /path/to/intra-v2/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔐 Безопасность

### Рекомендации:

1. **Не коммитьте .env файлы** в Git
2. **Используйте HTTPS** на продакшене
3. **Добавьте аутентификацию** для админ-панели
4. **Ограничьте CORS** только для вашего домена
5. **Используйте prepared statements** (уже реализовано)

## 📊 Мониторинг

Проверить состояние API:

```bash
curl http://localhost:3001/api/health
```

Ответ:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-12-17T17:56:38.000Z"
}
```

## 🐛 Troubleshooting

### Ошибка подключения к БД

```
❌ Не удалось подключиться к базе данных
```

**Решение:**
1. Проверьте данные в `.env`
2. Убедитесь, что MySQL сервер запущен
3. Проверьте firewall и доступ к порту 3306

### Ошибка CORS

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Решение:**
Обновите `FRONTEND_URL` в `.env` на правильный адрес frontend

### Cloudinary не работает

```
⚠️ Cloudinary не настроен!
```

**Решение:**
Настройте Cloudinary согласно разделу "Настройка Cloudinary"

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи сервера
2. Проверьте консоль браузера
3. Убедитесь, что миграции выполнены
4. Проверьте подключение к БД

---

**Готово! 🎉** Теперь ваш проект полностью работает с MySQL базой данных!
