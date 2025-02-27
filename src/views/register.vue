<template>
    <div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-8">
        <div class="p-6 sm:p-8 bg-white rounded-xl shadow-lg w-full max-w-md border border-gray-100">
            <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Create Account</h2>
            <form @submit.prevent="register" class="space-y-5">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        id="name"
                        v-model="name"
                        type="text"
                        placeholder="Enter your name"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>
                
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        id="email"
                        v-model="email"
                        type="email"
                        placeholder="your.email@example.com"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>
                
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="Create a password"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>
                
                <div>
                    <label for="passwordConfirm" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                        id="passwordConfirm"
                        v-model="passwordConfirmation"
                        type="password"
                        placeholder="Confirm your password"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>
                
                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 font-medium transition-all duration-200 shadow-sm"
                >
                    Register
                </button>
                
                <div class="text-center pt-2">
                    <p class="text-gray-600">
                        Already have an account? 
                        <router-link to="/login" class="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                            Login
                        </router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import api from '@/api';

export default {
    name: 'UserRegister',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        };
    },
    methods: {
        async register() {
            try {
                const response = await api.post('/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation,
                    device_name: 'web',
                });
                localStorage.setItem('token', response.data.token);
                this.$router.push('/wardrobe');
            } catch (error) {
                console.error('Registration failed', error.response?.data || error);
            }
        },
    },
};
</script>