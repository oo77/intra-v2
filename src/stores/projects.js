import { defineStore } from 'pinia'
import { projectsAPI } from '@/api/client'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [],
        loading: false,
        error: null,
        lastFetch: null
    }),

    getters: {
        allProjects: (state) => state.projects,
        getProjectById: (state) => (id) => state.projects.find(p => p.id === id),
        activeProjects: (state) => state.projects.filter(p => p.status === 'Active'),
        completedProjects: (state) => state.projects.filter(p => p.status === 'Completed'),
        isLoading: (state) => state.loading,
        hasError: (state) => !!state.error
    },

    actions: {
        // Загрузить все проекты
        async fetchProjects(force = false) {
            // Кэширование
            if (!force && this.lastFetch && Date.now() - this.lastFetch < 5 * 60 * 1000) {
                console.log('📦 Используем кэшированные данные проектов')
                return
            }

            this.loading = true
            this.error = null

            try {
                const response = await projectsAPI.getAll()
                this.projects = response.data
                this.lastFetch = Date.now()
                console.log('✅ Проекты загружены из базы данных')
            } catch (error) {
                this.error = error.message
                console.error('❌ Ошибка загрузки проектов:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        // Создать или обновить проект
        async saveProject(projectData) {
            this.loading = true
            this.error = null

            try {
                let response

                if (projectData.id) {
                    // Обновление существующего
                    response = await projectsAPI.update(projectData.id, projectData)
                } else {
                    // Создание нового
                    response = await projectsAPI.create(projectData)
                }

                // Перезагружаем проекты
                await this.fetchProjects(true)

                console.log('✅ Проект сохранен в базу данных')
                return response.data
            } catch (error) {
                this.error = error.message
                console.error('❌ Ошибка сохранения проекта:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        // Удалить проект
        async deleteProject(id) {
            this.loading = true
            this.error = null

            try {
                await projectsAPI.delete(id)

                // Удаляем из локального состояния
                this.projects = this.projects.filter(p => p.id !== id)

                console.log('✅ Проект удален из базы данных')
            } catch (error) {
                this.error = error.message
                console.error('❌ Ошибка удаления проекта:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        // Очистить ошибку
        clearError() {
            this.error = null
        },

        // Сбросить состояние
        reset() {
            this.projects = []
            this.loading = false
            this.error = null
            this.lastFetch = null
        }
    }
})
