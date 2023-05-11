<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold mb-8">Login</h1>
    <form class="flex flex-col space-y-4">
      <input type="email" placeholder="Email" class="px-4 py-2 border rounded-md" />
      <input type="password" placeholder="Password" class="px-4 py-2 border rounded-md" />
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Login</button>
    </form>
    <p class="mt-4">
      Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link>
    </p>
  </div>
</template>
