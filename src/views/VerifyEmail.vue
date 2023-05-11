<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Verify your email address
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        We've sent a verification code to your email address. Please enter the code below to verify your email address.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSubmit">
          <div>
            <label for="code" class="block text-sm font-medium text-gray-700">
              Verification code
            </label>
            <div class="mt-1">
              <input v-model="code" id="code" name="code" type="text" autocomplete="off" required
                     class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            </div>
          </div>

          <div class="mt-4">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Verify email
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useNotification } from '@kyvg/vue3-notification'
import { useRoute, useRouter } from 'vue-router'
import authService from '@/services/authService'
import { useAuthStore } from '@/store/auth/authStore';

export default defineComponent({
  setup() {
    const route = useRoute()
    const notification = useNotification()
    const code = ref('')
    const router = useRouter()
    const email = route.query.email || ''
    const authStore = useAuthStore()

    const handleSubmit = async () => {
      try {
        const { message, token } =  await authService.verifyEmail(email, code.value)
        authStore.setToken(token)
        notification.notify({
          title: message,
          type: 'success'
        })
        router.push({name: 'TodoList'})
      } catch (error) {
        console.log(error);
        notification.notify({
          title: error?.response?.data?.message || 'Failed to verify email',
          type: 'error'
        })
      }
    }

    return {
      code,
      handleSubmit
    }
  }
})

</script>
