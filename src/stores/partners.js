import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { partnersAPI } from '@/api/client'

export const usePartnersStore = defineStore('partners', () => {
    // State
    const partners = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    // Getters
    const partnersList = computed(() => partners.value)
    const activePartners = computed(() =>
        partners.value.filter(p => p.is_active).sort((a, b) => a.display_order - b.display_order)
    )

    // Actions
    async function fetchPartners(force = false) {
        if (partners.value.length > 0 && !force) {
            return partners.value
        }

        isLoading.value = true
        error.value = null

        try {
            const response = await partnersAPI.getAll()
            partners.value = response.data
            return response.data
        } catch (err) {
            error.value = err.message
            console.error('❌ Ошибка загрузки партнеров:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function getPartner(id) {
        try {
            const response = await partnersAPI.getOne(id)
            return response.data
        } catch (err) {
            error.value = err.message
            console.error(`❌ Ошибка загрузки партнера ${id}:`, err)
            throw err
        }
    }

    async function savePartner(partnerData) {
        isLoading.value = true
        error.value = null

        try {
            if (partnerData.id) {
                // Обновление существующего партнера
                await partnersAPI.update(partnerData.id, partnerData)
                console.log('✅ Партнер обновлен:', partnerData.id)
            } else {
                // Создание нового партнера
                await partnersAPI.create(partnerData)
                console.log('✅ Партнер создан')
            }

            // Обновляем список
            await fetchPartners(true)
        } catch (err) {
            error.value = err.message
            console.error('❌ Ошибка сохранения партнера:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function deletePartner(id) {
        isLoading.value = true
        error.value = null

        try {
            await partnersAPI.delete(id)
            console.log('✅ Партнер удален:', id)

            // Обновляем список
            await fetchPartners(true)
        } catch (err) {
            error.value = err.message
            console.error('❌ Ошибка удаления партнера:', err)
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        // State
        partners,
        isLoading,
        error,
        // Getters
        partnersList,
        activePartners,
        // Actions
        fetchPartners,
        getPartner,
        savePartner,
        deletePartner
    }
})
