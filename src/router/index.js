import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth/authStore'

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: () => import('../views/Welcome')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register')
    },
    {
        path: '/verify-email',
        name: 'VerifyEmail',
        component: () => import('../views/VerifyEmail')
    },
    {
        path: '/todo-list',
        name: 'TodoList',
        component: () => import('../views/TodoList'),
        meta: { requiresAuth: true }
    },
    {
        path: '/todos/new',
        name: 'NewTodo',
        component: () => import('../views/TodoForm'),
        meta: { requiresAuth: true }
    },
    {
        path: '/todos/:id/edit',
        name: 'EditTodo',
        component: () => import('../views/TodoForm'),
        meta: { requiresAuth: true }
    },
    {
        path: '/logout',
        name: 'Logout',
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore()
            authStore.logout()
            next('/')
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next('/')
    } else if (to.path === '/' && authStore.isLoggedIn) {
        next('/todo-list')
    } else {
        next()
    }
})

export default router
