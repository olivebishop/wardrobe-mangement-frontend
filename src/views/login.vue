<template>
    <div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-8">
        <div class="p-6 sm:p-8 bg-white rounded-xl shadow-lg w-full max-w-md border border-gray-100">
            <div class="text-center mb-6">
                <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Welcome Back</h2>
                <p class="text-gray-600 mt-2">Sign in to access your wardrobe</p>
            </div>
            
            <form @submit.prevent="login" class="space-y-5">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        id="email"
                        v-model="email"
                        type="email"
                        placeholder="your@email.com"
                        autocomplete="email"
                        required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
                
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="••••••••"
                        autocomplete="current-password"
                        required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
                    </div>
                    <div class="text-sm">
                        <a href="#" class="text-blue-600 hover:text-blue-800">Forgot password?</a>
                    </div>
                </div>
                
                <button
                    type="submit"
                    class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Sign In
                </button>
                
                <p class="mt-4 text-center text-gray-600">
                    Don't have an account? 
                    <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-800 transition">
                        Create account
                    </router-link>
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
        return { 
            email: '', 
            password: '' 
        };
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
                // You might want to add error handling/display here
            }
        },
    },
};
</script>