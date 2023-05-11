<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold mb-8">Login</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block font-bold mb-2" for="email">Email</label>
        <input class="px-4 py-2 border rounded-md w-full" type="email" v-model="form.email" required>
      </div>

      <div class="mb-4">
        <label class="block font-bold mb-2" for="password">Password</label>
        <input class="px-4 py-2 border rounded-md w-full" type="password" v-model="form.password" required>
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Login</button>
    </form>
    <p class="mt-4">
      Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link>
    </p>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { useNotification } from '@kyvg/vue3-notification'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth/authStore'
import authService from '@/services/authService'

export default defineComponent({
  name: 'Registration',
  setup() {
    const notification = useNotification()
    const router = useRouter()
    const form = reactive({
      email: '',
      password: '',
    })

    const authStore = useAuthStore()

    const handleSubmit = async () => {
      try {
        const { token } = await authService.login(form)
        authStore.setToken(token)
        router.push({name: 'TodoList'})
      } catch (error) {
        notification.notify({
          title: error?.response?.data?.message || 'Failed to register',
          type: 'error'
        });
      }
    }

    return {
      form,
      handleSubmit
    }
  }
})
</script>
