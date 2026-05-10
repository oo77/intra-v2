import { defineStore } from 'pinia'
import { galleryAPI } from '@/api/client'

export const useGalleryStore = defineStore('gallery', {
    state: () => ({
        items: [],
        loading: false,
        error: null,
        lastFetch: null
    }),

    getters: {
        row1Images: (state) => state.items.filter(item => item.row_num === 1 || item.row_num === '1'),
        row2Images: (state) => state.items.filter(item => item.row_num === 2 || item.row_num === '2'),
        allImages: (state) => state.items,
        isLoading: (state) => state.loading,
        hasError: (state) => !!state.error
    },

    actions: {
        async fetchItems(force = false) {
            if (!force && this.lastFetch && Date.now() - this.lastFetch < 5 * 60 * 1000) return

            this.loading = true
            try {
                const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
                let itemsData;

                if (isStatic) {
                    const response = await fetch('/gallery.json?' + Date.now())
                    if (!response.ok) throw new Error('Не удалось загрузить галерею')
                    itemsData = await response.json()
                } else {
                    const response = await galleryAPI.getAll()
                    itemsData = response.data
                }

                this.items = itemsData
                this.lastFetch = Date.now()
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async saveItem(itemData, imageFile = null) {
            this.loading = true
            try {
                const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
                const cmsUrl = import.meta.env.VITE_CMS_API_URL || ''
                const token = 'my_super_secret_token_123'

                if (isStatic) {
                    let finalImagePath = itemData.image
                    if (imageFile) {
                        const formData = new FormData()
                        formData.append('image', imageFile)
                        const uploadRes = await fetch(`${cmsUrl}/api/static/upload`, {
                            method: 'POST',
                            headers: { 'x-cms-token': token },
                            body: formData
                        })
                        const uploadData = await uploadRes.json()
                        finalImagePath = uploadData.url
                    }

                    await fetch(`${cmsUrl}/api/static/gallery`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'x-cms-token': token },
                        body: JSON.stringify({ ...itemData, url: finalImagePath, image: finalImagePath })
                    })
                    await this.fetchItems(true)
                } else {
                    if (itemData.id) await galleryAPI.update(itemData.id, itemData)
                    else await galleryAPI.create(itemData)
                    await this.fetchItems(true)
                }
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteItem(id) {
            this.loading = true
            try {
                const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
                if (isStatic) {
                    const cmsUrl = import.meta.env.VITE_CMS_API_URL || ''
                    const token = 'my_super_secret_token_123'
                    await fetch(`${cmsUrl}/api/static/gallery/${id}`, {
                        method: 'DELETE',
                        headers: { 'x-cms-token': token }
                    })
                } else {
                    await galleryAPI.delete(id)
                }
                await this.fetchItems(true)
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
            this.items = []
            this.loading = false
            this.error = null
            this.lastFetch = null
        }
    }
})
