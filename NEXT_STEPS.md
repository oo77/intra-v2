# 📊 Краткая сводка по миграции на MySQL

## ✅ Выполнено

1. ✅ **Создана локальная MySQL база данных** `intra_local`
2. ✅ **Созданы 3 таблицы:**
   - `gallery` - 12 изображений
   - `projects` - 6 проектов  
   - `team_members` - 5 членов команды

3. ✅ **Созданы REST API endpoints:**
   - `/api/gallery` - управление галереей
   - `/api/projects` - управление проектами
   - `/api/team` - управление командой

4. ✅ **API сервер запущен** на `http://localhost:3001`

## 🚀 Быстрый старт

### Запустить API сервер
```bash
node server/index.js
```

### Проверить работу API
```bash
curl http://localhost:3001/api/health
```

## ⏳ Что нужно сделать дальше

### 1. Обновить Pinia Stores

Создать/обновить stores для работы с API:

**src/stores/useGalleryStore.js:**
```javascript
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

export const useGalleryStore = defineStore('gallery', {
  state: () => ({
    images: { row1: [], row2: [] },
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchGallery() {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/gallery`)
        this.images = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async addImage(imageData) {
      const response = await axios.post(`${API_URL}/gallery`, imageData)
      await this.fetchGallery()
      return response.data
    },
    
    async updateImage(id, imageData) {
      await axios.put(`${API_URL}/gallery/${id}`, imageData)
      await this.fetchGallery()
    },
    
    async deleteImage(id) {
      await axios.delete(`${API_URL}/gallery/${id}`)
      await this.fetchGallery()
    }
  }
})
```

**src/stores/useProjectsStore.js:**
```javascript
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchProjects() {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/projects`)
        this.projects = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async addProject(projectData) {
      const response = await axios.post(`${API_URL}/projects`, projectData)
      await this.fetchProjects()
      return response.data
    },
    
    async updateProject(id, projectData) {
      await axios.put(`${API_URL}/projects/${id}`, projectData)
      await this.fetchProjects()
    },
    
    async deleteProject(id) {
      await axios.delete(`${API_URL}/projects/${id}`)
      await this.fetchProjects()
    }
  }
})
```

**src/stores/useTeamStore.js:**
```javascript
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

export const useTeamStore = defineStore('team', {
  state: () => ({
    members: {},
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchTeam() {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/team`)
        this.members = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    
    async addMember(memberData) {
      const response = await axios.post(`${API_URL}/team`, memberData)
      await this.fetchTeam()
      return response.data
    },
    
    async updateMember(id, memberData) {
      await axios.put(`${API_URL}/team/${id}`, memberData)
      await this.fetchTeam()
    },
    
    async deleteMember(id) {
      await axios.delete(`${API_URL}/team/${id}`)
      await this.fetchTeam()
    }
  }
})
```

### 2. Установить axios (если еще не установлен)
```bash
npm install axios
```

### 3. Обновить компоненты Vue

В каждом компоненте, который использует данные:

```javascript
import { useGalleryStore } from '@/stores/useGalleryStore'
import { onMounted } from 'vue'

const galleryStore = useGalleryStore()

onMounted(async () => {
  await galleryStore.fetchGallery()
})
```

## 📁 Структура проекта

```
intra-v2/
├── server/
│   ├── config/
│   │   └── database.js          # Конфигурация БД
│   ├── migrations/
│   │   ├── 001_create_tables.sql # SQL миграции
│   │   └── run-migrations.js     # Скрипт миграций
│   ├── routes/
│   │   ├── gallery.js            # API галереи
│   │   ├── projects.js           # API проектов
│   │   └── team-members.js       # API команды
│   ├── index.js                  # Главный файл сервера
│   ├── migrate-data.js           # Миграция данных из JSON
│   └── test-db-connection.js     # Тест подключения
├── src/
│   ├── stores/                   # ⏳ Нужно обновить
│   └── views/                    # ⏳ Нужно обновить
├── .env                          # Конфигурация (локальная БД)
├── .env.backup                   # Резервная копия (удаленная БД)
└── setup-local-db.sh             # Скрипт настройки БД
```

## 🔄 Процесс работы

1. **Разработка:** Используйте локальную БД (`localhost`)
2. **Продакшн:** Переключитесь на удаленную БД (когда будет доступна)

## 📞 Поддержка

Полная документация: `MYSQL_MIGRATION.md`

## ⚠️ Важно

- API сервер должен быть запущен для работы фронтенда
- Сейчас используется локальная БД (удаленная недоступна)
- Все данные из JSON успешно перенесены в MySQL
