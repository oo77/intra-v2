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
            if (!force && this.lastFetch && Date.now() - this.lastFetch < 5 * 60 * 1000) {
                return
            }

            this.loading = true
            this.error = null

            try {
                // В статическом режиме всегда тянем из JSON файла в корне (public/projects.json)
                const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
                
                let projectsData;
                if (isStatic) {
                    const response = await fetch('/projects.json?' + Date.now()) // Anti-cache
                    if (!response.ok) throw new Error('Не удалось загрузить projects.json')
                    projectsData = await response.json()
                    console.log('✅ Проекты загружены из JSON файла')
                } else {
                    const response = await projectsAPI.getAll()
                    projectsData = response.data
                    console.log('✅ Проекты загружены из базы данных')
                }

                this.projects = projectsData
                this.lastFetch = Date.now()
            } catch (error) {
                this.error = error.message
                console.error('❌ Ошибка загрузки проектов:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        // Создать или обновить проект
        async saveProject(projectData, imageFile = null) {
            this.loading = true
            this.error = null

            try {
                const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
                const cmsUrl = import.meta.env.VITE_CMS_API_URL || ''
                const token = 'my_super_secret_token_123'

                if (isStatic) {
                    let finalImagePath = projectData.image

                    // 1. Если есть новый файл изображения, сначала грузим его
                    if (imageFile) {
                        const formData = new FormData()
                        formData.append('image', imageFile)
                        
                        const uploadRes = await fetch(`${cmsUrl}/api/static/upload`, {
                            method: 'POST',
                            headers: { 'x-cms-token': token },
                            body: formData
                        })
                        
                        if (!uploadRes.ok) throw new Error('Ошибка загрузки изображения')
                        const uploadData = await uploadRes.json()
                        finalImagePath = uploadData.url
                    }

                    // 2. Сохраняем данные проекта в JSON
                    const saveRes = await fetch(`${cmsUrl}/api/static/projects`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'x-cms-token': token 
                        },
                        body: JSON.stringify({ ...projectData, image: finalImagePath })
                    })

                    if (!saveRes.ok) throw new Error('Ошибка сохранения JSON')
                    
                    await this.fetchProjects(true)
                    return true
                } else {
                    // Старая логика с БД
                    if (projectData.id) {
                        await projectsAPI.update(projectData.id, projectData)
                    } else {
                        await projectsAPI.create(projectData)
                    }
                    await this.fetchProjects(true)
                }
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        // Удалить проект
        async deleteProject(id) {
            this.loading = true
            try {
                const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
                if (isStatic) {
                   const cmsUrl = import.meta.env.VITE_CMS_API_URL || ''
                   const token = 'my_super_secret_token_123'

                   const res = await fetch(`${cmsUrl}/api/static/projects/${id}`, {
                       method: 'DELETE',
                       headers: { 'x-cms-token': token }
                   })
                   if (!res.ok) throw new Error('Ошибка удаления')
                   
                   this.projects = this.projects.filter(p => p.id !== id)
                } else {
                    await projectsAPI.delete(id)
                }
                await this.fetchProjects(true)
            } catch (error) {
                this.error = error.message
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
