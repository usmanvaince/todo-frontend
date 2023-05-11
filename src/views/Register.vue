<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold mb-8">Register</h1>
    <form class="flex flex-col space-y-4">
      <input type="text" placeholder="First name" class="px-4 py-2 border rounded-md" />
      <input type="text" placeholder="Last name" class="px-4 py-2 border rounded-md" />
      <input type="email" placeholder="Email" class="px-4 py-2 border rounded-md" />
      <input type="password" placeholder="Password" class="px-4 py-2 border rounded-md" />
      <input type="password" placeholder="Confirm Password" class="px-4 py-2 border rounded-md" />
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Register</button>
    </form>
    <p class="mt-4">
      Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link>
    </p>
  </div>
</template>
