import axiosInstance from '@/utils/axiosInstance';

export default {
    async register({ email, password, password_confirmation }) {
        const response = await axiosInstance.post('/register', {
            email,
            password,
            password_confirmation
        })
        return response.data
    },

    async verifyEmail(email, verification_code) {
        const response = await axiosInstance.post('/verify', { email, verification_code})
        return response.data
    },

    async login({ email, password }) {
        const response = await axiosInstance.post('/login', {
            email, password
        })
        return response.data
    },

}
