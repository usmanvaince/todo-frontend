import axios from 'axios'
import { API_URL } from '@/utils/constant';

export default {
    async register({ first_name, last_name, email, password }) {
        const response = await axios.post(`${API_URL}/register`, {
            first_name,
            last_name,
            email,
            password
        })
        return response.data
    },

    async verifyEmail(email, verification_code) {
        const response = await axios.post(`${API_URL}/verify-email`, { email, verification_code})
        return response.data
    },

    async login({ email, password }) {
        const response = await axios.post(`${API_URL}/login`, {
            email, password
        })
        return response.data
    },

    async logout() {
        const response = await axios.post(`${API_URL}/logout`)
        return response.data
    }
}
