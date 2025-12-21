import { defineStore } from 'pinia'
import { galleryAPI } from '@/api/client'

export const useGalleryStore = defineStore('gallery', {
    state: () => ({
        gallery: { row1: [], row2: [] },
        loading: false,
        error: null,
        lastFetch: null
    }),

    getters: {
        row1Images: (state) => state.gallery.row1,
        row2Images: (state) => state.gallery.row2,
        allImages: (state) => [...state.gallery.row1, ...state.gallery.row2],
        isLoading: (state) => state.loading,
        hasError: (state) => !!state.error
    },

    actions: {
        // Загрузить галерею
        async fetchGallery(force = false) {
            // Кэширование
            if (!force && this.lastFetch && Date.now() - this.lastFetch < 5 * 60 * 1000) {
                console.log('📦 Используем кэшированные данные галереи')
                return
            }

            this.loading = true
            this.error = null

            try {
                const response = await galleryAPI.getAll()
                this.gallery = response.data
                this.lastFetch = Date.now()
                console.log('✅ Галерея загружена из базы данных')
            } catch (error) {
                this.error = error.message
                console.error('❌ Ошибка загрузки галереи:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        // Создать или обновить изображение
        async saveImage(imageData, rowNumber) {
            this.loading = true
            this.error = null

            try {
                let response
                const dataToSend = {
                    url: imageData.url,
                    alt: imageData.alt,
                    row_num: rowNumber
                }

                if (imageData.id) {
                    // Обновление существующего
                    response = await galleryAPI.update(imageData.id, dataToSend)
                } else {
                    // Создание нового
                    response = await galleryAPI.create(dataToSend)
                }

                // Перезагружаем галерею
                await this.fetchGallery(true)

                console.log('✅ Изображение сохранено в базу данных')
                return response.data
            } catch (error) {
                this.error = error.message
                console.error('❌ Ошибка сохранения изображения:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        // Удалить изображение
        async deleteImage(id, rowNumber) {
            this.loading = true
            this.error = null

            try {
                await galleryAPI.delete(id)

                // Удаляем из локального состояния
                const row = rowNumber === 1 ? 'row1' : 'row2'
                this.gallery[row] = this.gallery[row].filter(img => img.id !== id)

                console.log('✅ Изображение удалено из базы данных')
            } catch (error) {
                this.error = error.message
                console.error('❌ Ошибка удаления изображения:', error)
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
            this.gallery = { row1: [], row2: [] }
            this.loading = false
            this.error = null
            this.lastFetch = null
        }
    }
})
