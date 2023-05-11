<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="code" class="block text-sm font-medium text-gray-700">
              Verification code
            </label>
            <div class="mt-1">
              <input v-model="code" id="code" name="code" type="text" autocomplete="off" required
                     class="appearance-none block w-full px-3 py-2 border {{ errors.code ? 'border-red-500' : 'border-gray-300' }} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <div v-if="errors.code" class="mt-2 text-sm text-red-500">
                {{ errors.code }}
              </div>
            </div>
          </div>

          <div>
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
export default {
  data() {
    return {
      code: '',
      errors: {}
    }
  },
  methods: {
    handleSubmit() {
      // Validate form data and submit verification code to server
    }
  }
}
</script>
