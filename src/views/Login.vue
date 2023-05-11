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

    </form>
    <p class="mt-4">
      Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link>
    </p>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import { useNotification } from '@kyvg/vue3-notification'
import { useRouter } from 'vue-router'
import authService from '@/services/authService'


export default defineComponent({
  name: 'Registration',
  setup() {
    const notification = useNotification()
    const loading = ref(false)
    const router = useRouter()
    const form = reactive({
      email: '',
      password: '',
    });

    const handleSubmit = async () => {
      try {
        loading.value = true;
        await authService.login(form)
        router.push({name: 'TodoList'})
      } catch (error) {
        notification.notify({
          title: error?.response?.data?.message || 'Failed to register',
          type: 'error'
        });
      } finally {
        loading.value = false;
      }
    }

    return {
      form,
      loading,
      handleSubmit
    }
  }
})
</script>
