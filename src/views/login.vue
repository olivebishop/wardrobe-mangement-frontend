<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div class="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Login</h2>
        <form @submit.prevent="login">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
          <p class="mt-2 text-sm text-gray-600">
            Don't have an account? <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/api';
  
  export default {
      name: 'LoginView',
      data() {
        return { email: '', password: '' };
      },
    methods: {
      async login() {
        try {
          const response = await api.post('/sanctum/token', {
            email: this.email,
            password: this.password,
            device_name: 'web',
          });
          localStorage.setItem('token', response.data.token);
          this.$router.push('/wardrobe');
        } catch (error) {
          console.error('Login failed', error.response?.data || error);
        }
      },
    },
  };
  </script>