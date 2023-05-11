import { defineStore } from 'pinia'

const STORAGE_KEY = 'auth_token'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        token: null,
    }),
    actions: {
        async setToken(token) {
            localStorage.setItem(STORAGE_KEY, token)
            this.token = token
        },
        async logout() {
            localStorage.removeItem(STORAGE_KEY)
            this.token = null
        },
    },
    getters: {
        isLoggedIn() {
            if (this.token) {
                return true
            }
            const token = localStorage.getItem(STORAGE_KEY);
            if (token) {
                this.token = token
                return true
            }
            return false;
        }
    }
})
