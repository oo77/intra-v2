import { defineStore } from 'pinia'
import { teamAPI } from '@/api/client'

export const useTeamStore = defineStore('team', {
    state: () => ({
        members: {},
        loading: false,
        error: null,
        lastFetch: null
    }),

    getters: {
        membersList: (state) => Object.values(state.members),
        getMemberById: (state) => (id) => state.members[id],
        isLoading: (state) => state.loading,
        hasError: (state) => !!state.error
    },

    actions: {
        // Загрузить всех членов команды
        async fetchMembers(force = false) {
            // Кэширование: не загружаем повторно, если данные свежие (< 5 минут)
            if (!force && this.lastFetch && Date.now() - this.lastFetch < 5 * 60 * 1000) {
                console.log('📦 Используем кэшированные данные команды')
                return
            }

            this.loading = true
            this.error = null

            try {
                const response = await teamAPI.getAll()
                this.members = response.data
                this.lastFetch = Date.now()
                console.log('✅ Команда загружена из базы данных')
            } catch (error) {
                this.error = error.message
                console.error('❌ Ошибка загрузки команды:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        // Создать или обновить члена команды
        async saveMember(memberData) {
            this.loading = true
            this.error = null

            try {
                const response = await teamAPI.update(memberData)

                // Обновляем локальное состояние
                this.members[memberData.id] = memberData

                console.log('✅ Член команды сохранен в базу данных')
                return response.data
            } catch (error) {
                this.error = error.message
                console.error('❌ Ошибка сохранения члена команды:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        // Удалить члена команды
        async deleteMember(id) {
            this.loading = true
            this.error = null

            try {
                await teamAPI.delete(id)

                // Удаляем из локального состояния
                delete this.members[id]

                console.log('✅ Член команды удален из базы данных')
            } catch (error) {
                this.error = error.message
                console.error('❌ Ошибка удаления члена команды:', error)
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
