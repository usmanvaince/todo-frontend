import axios from 'axios'
import { useAuthStore } from '@/store/auth/authStore'
import { API_URL } from '@/utils/constant';
import router from '@/router'
const authStore = useAuthStore()

const axiosInstance = axios.create({
    baseURL: API_URL
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = authStore.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            router.push({name: 'Login'})
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
