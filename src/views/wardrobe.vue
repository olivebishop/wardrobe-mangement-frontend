<template>
    <div class="container mx-auto p-4">
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-3 sm:mb-0">My Wardrobe</h1>
            <button
                @click="logout"
                class="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>

        <div class="mb-6 flex flex-col sm:flex-row gap-3">
            <div class="relative w-full sm:w-2/3">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    v-model="search"
                    placeholder="Search items..."
                    class="w-full pl-10 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <select
                v-model="categoryFilter"
                class="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Categories</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="shoes">Shoes</option>
            </select>
        </div>

        <button
            @click="showAddForm = true"
            class="mb-6 w-full sm:w-auto px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Item
        </button>

        <!-- Add Form Modal -->
        <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <h2 class="text-xl font-bold mb-4">Add New Item</h2>
                <input
                    v-model="newItem.name"
                    placeholder="Item Name"
                    class="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    v-model="newItem.category"
                    class="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>Select Category</option>
                    <option value="tops">Tops</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="shoes">Shoes</option>
                </select>
                <textarea
                    v-model="newItem.description"
                    placeholder="Description"
                    rows="3"
                    class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <div class="flex gap-3">
                    <button
                        @click="addItem"
                        class="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                    <button
                        @click="cancelAdd"
                        class="flex-1 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit Form Modal -->
        <div v-if="showEditForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <h2 class="text-xl font-bold mb-4">Edit Item</h2>
                <input
                    v-model="editingItem.name"
                    placeholder="Item Name"
                    class="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    v-model="editingItem.category"
                    class="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="tops">Tops</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="shoes">Shoes</option>
                </select>
                <textarea
                    v-model="editingItem.description"
                    placeholder="Description"
                    rows="3"
                    class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <div class="flex gap-3">
                    <button
                        @click="saveEdit"
                        class="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                    <button
                        @click="cancelEdit"
                        class="flex-1 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>

        <!-- Items Grid -->
        <div v-if="filteredItems.length === 0" class="flex flex-col items-center justify-center p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">No items found</h3>
            <p class="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
                v-for="item in filteredItems" 
                :key="item.id" 
                class="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200"
            >
                <div class="p-5">
                    <div class="flex justify-between items-start">
                        <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ item.name }}</h3>
                        <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{{ item.category }}</span>
                    </div>
                    <p class="text-gray-600 mt-2">{{ item.description || 'No description' }}</p>
                    <div class="mt-4 flex gap-2">
                        <button
                            @click="editItem(item)"
                            class="flex-1 px-3 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition flex items-center justify-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>
                        <button
                            @click="deleteItem(item.id)"
                            class="flex-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center justify-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api';

export default {
    name: 'WardrobeView',
    data() {
        return {
            items: [],
            search: '',
            categoryFilter: '',
            showAddForm: false,
            showEditForm: false,
            newItem: { name: '', category: '', description: '' },
            editingItem: { id: null, name: '', category: '', description: '' },
        };
    },
    computed: {
        filteredItems() {
            return this.items.filter(item => 
                item.name.toLowerCase().includes(this.search.toLowerCase()) &&
                (!this.categoryFilter || item.category === this.categoryFilter)
            );
        },
    },
    mounted() {
        this.fetchItems();
    },
    methods: {
        async fetchItems() {
            try {
                const response = await api.get('/clothing-items');
                this.items = response.data;
            } catch (error) {
                console.error('Failed to fetch items', error);
            }
        },
        async addItem() {
            if (!this.newItem.name || !this.newItem.category) {
                alert('Please provide both a name and category');
                return;
            }
            
            try {
                await api.post('/clothing-items', this.newItem);
                this.showAddForm = false;
                this.newItem = { name: '', category: '', description: '' };
                await this.fetchItems();
            } catch (error) {
                console.error('Failed to add item', error);
            }
        },
        cancelAdd() {
            this.showAddForm = false;
            this.newItem = { name: '', category: '', description: '' };
        },
        editItem(item) {
            this.editingItem = { ...item };
            this.showEditForm = true;
        },
        async saveEdit() {
            if (!this.editingItem.name || !this.editingItem.category) {
                alert('Please provide both a name and category');
                return;
            }
            
            try {
                await api.put(`/clothing-items/${this.editingItem.id}`, {
                    name: this.editingItem.name,
                    category: this.editingItem.category,
                    description: this.editingItem.description,
                });
                this.showEditForm = false;
                await this.fetchItems();
            } catch (error) {
                console.error('Failed to update item', error);
            }
        },
        cancelEdit() {
            this.showEditForm = false;
            this.editingItem = { id: null, name: '', category: '', description: '' };
        },
        async deleteItem(id) {
            if (confirm('Are you sure you want to delete this item?')) {
                try {
                    await api.delete(`/clothing-items/${id}`);
                    await this.fetchItems();
                } catch (error) {
                    console.error('Failed to delete item', error);
                }
            }
        },
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        },
    },
};
</script>