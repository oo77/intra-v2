import { defineStore } from 'pinia'
import { teamAPI } from '@/api/client'

export const useTeamStore = defineStore('team', {
    state: () => ({
        members: [],
        loading: false,
        error: null,
        lastFetch: null
    }),

    getters: {
        membersList: (state) => state.members,
        getMemberById: (state) => (id) => state.members.find(m => m.id === id),
        isLoading: (state) => state.loading,
        hasError: (state) => !!state.error
    },

    actions: {
        async fetchMembers(force = false) {
            if (!force && this.lastFetch && Date.now() - this.lastFetch < 5 * 60 * 1000) return

            this.loading = true
            try {
                const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
                let membersData;

                if (isStatic) {
                    const response = await fetch('/team-members.json?' + Date.now())
                    if (!response.ok) throw new Error('Не удалось загрузить команду')
                    membersData = await response.json()
                } else {
                    const response = await teamAPI.getAll()
                    membersData = response.data
                }

                this.members = membersData
                this.lastFetch = Date.now()
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async saveMember(memberData, imageFile = null) {
            this.loading = true
            try {
                const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
                const cmsUrl = import.meta.env.VITE_CMS_API_URL || ''
                const token = 'my_super_secret_token_123'

                if (isStatic) {
                    let finalImagePath = memberData.image
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

                    await fetch(`${cmsUrl}/api/static/team`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'x-cms-token': token },
                        body: JSON.stringify({ ...memberData, image: finalImagePath })
                    })
                    await this.fetchMembers(true)
                } else {
                    if (memberData.id) await teamAPI.update(memberData.id, memberData)
                    else await teamAPI.create(memberData)
                    await this.fetchMembers(true)
                }
            } catch (error) {
                this.error = error.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteMember(id) {
            this.loading = true
            try {
                const isStatic = import.meta.env.VITE_LOCAL_CMS_ENABLED === 'true'
                if (isStatic) {
                    const cmsUrl = import.meta.env.VITE_CMS_API_URL || ''
                    const token = 'my_super_secret_token_123'
                    await fetch(`${cmsUrl}/api/static/team/${id}`, {
                        method: 'DELETE',
                        headers: { 'x-cms-token': token }
                    })
                } else {
                    await teamAPI.delete(id)
                }
                await this.fetchMembers(true)
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
            this.members = {}
            this.loading = false
            this.error = null
            this.lastFetch = null
        }
    }
})
