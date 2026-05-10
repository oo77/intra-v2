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
        if (partners.value.length > 0 && !force) return partners.value

        isLoading.value = true
        try {
            const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
            let partnersData;

            if (isStatic) {
                const response = await fetch('/partners.json?' + Date.now())
                if (!response.ok) throw new Error('Не удалось загрузить партнеров')
                partnersData = await response.json()
            } else {
                const response = await partnersAPI.getAll()
                partnersData = response.data
            }

            partners.value = partnersData
            return partnersData
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function getPartner(id) {
        try {
            const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
            if (isStatic) {
                return partners.value.find(p => String(p.id) === String(id))
            } else {
                const response = await partnersAPI.getOne(id)
                return response.data
            }
        } catch (err) {
            error.value = err.message
            throw err
        }
    }

    async function savePartner(partnerData, imageFile = null) {
        isLoading.value = true
        try {
            const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
            const cmsUrl = import.meta.env.VITE_CMS_API_URL || ''
            const token = 'my_super_secret_token_123'

            if (isStatic) {
                let finalImagePath = partnerData.logo
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

                await fetch(`${cmsUrl}/api/static/partners`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-cms-token': token },
                    body: JSON.stringify({ ...partnerData, logo: finalImagePath })
                })
            } else {
                if (partnerData.id) await partnersAPI.update(partnerData.id, partnerData)
                else await partnersAPI.create(partnerData)
            }
            await fetchPartners(true)
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function deletePartner(id) {
        isLoading.value = true
        try {
            const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
            if (isStatic) {
                const cmsUrl = import.meta.env.VITE_CMS_API_URL || ''
                const token = 'my_super_secret_token_123'
                await fetch(`${cmsUrl}/api/static/partners/${id}`, {
                    method: 'DELETE',
                    headers: { 'x-cms-token': token }
                })
            } else {
                await partnersAPI.delete(id)
            }
            await fetchPartners(true)
        } catch (err) {
            error.value = err.message
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
