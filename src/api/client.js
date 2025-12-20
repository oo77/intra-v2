import axios from 'axios'

// Базовый URL API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Создаем экземпляр axios
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000 // 30 секунд
})

// Интерцептор для логирования запросов
apiClient.interceptors.request.use(
    (config) => {
        console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`)
        return config
    },
    (error) => {
        console.error('❌ Request Error:', error)
        return Promise.reject(error)
    }
)

// Интерцептор для обработки ответов
apiClient.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response: ${response.config.url}`)
        return response
    },
    (error) => {
        console.error('❌ Response Error:', error.response?.data || error.message)

        // Обработка ошибок
        if (error.response) {
            // Сервер ответил с ошибкой
            const message = error.response.data?.error || error.response.data?.message || 'Ошибка сервера'
            throw new Error(message)
        } else if (error.request) {
            // Запрос был отправлен, но ответа не получено
            throw new Error('Сервер не отвечает. Проверьте подключение к интернету.')
        } else {
            // Ошибка при настройке запроса
            throw new Error(error.message)
        }
    }
)

// API методы для команды
export const teamAPI = {
    getAll: () => apiClient.get('/team'),
    getOne: (id) => apiClient.get(`/team/${id}`),
    create: (data) => apiClient.post('/team', data),
    update: (id, data) => apiClient.put(`/team/${id}`, data),
    delete: (id) => apiClient.delete(`/team/${id}`)
}

// API методы для проектов
export const projectsAPI = {
    getAll: () => apiClient.get('/projects'),
    getOne: (id) => apiClient.get(`/projects/${id}`),
    create: (data) => apiClient.post('/projects', data),
    update: (id, data) => apiClient.put(`/projects/${id}`, data),
    delete: (id) => apiClient.delete(`/projects/${id}`)
}

// API методы для галереи
export const galleryAPI = {
    getAll: () => apiClient.get('/gallery'),
    getOne: (id) => apiClient.get(`/gallery/${id}`),
    create: (data) => apiClient.post('/gallery', data),
    update: (id, data) => apiClient.put(`/gallery/${id}`, data),
    delete: (id) => apiClient.delete(`/gallery/${id}`)
}

// Проверка здоровья API
export const healthCheck = () => apiClient.get('/health')

export default apiClient
