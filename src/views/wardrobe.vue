<template>
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">My Wardrobe</h1>
        <button
          @click="logout"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
  
      <div class="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          v-model="search"
          placeholder="Search items..."
          class="w-full sm:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          v-model="categoryFilter"
          class="w-full sm:w-48 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>
  
      <button
        @click="showAddForm = true"
        class="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Add Item
      </button>
  
      <div v-if="showAddForm" class="mb-4 p-4 bg-gray-100 rounded">
        <input
          v-model="newItem.name"
          placeholder="Name"
          class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newItem.category"
          placeholder="Category"
          class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newItem.description"
          placeholder="Description"
          class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="flex gap-2">
          <button
            @click="addItem"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
          <button
            @click="cancelAdd"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="item in filteredItems" :key="item.id" class="p-4 bg-white rounded shadow">
          <h3 class="text-lg font-semibold text-gray-800">{{ item.name }}</h3>
          <p class="text-gray-700">{{ item.category }}</p>
          <p class="text-gray-600">{{ item.description || 'No description' }}</p>
          <div class="mt-2 flex gap-2">
            <button
              @click="editItem(item)"
              class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              @click="deleteItem(item.id)"
              class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
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
        newItem: { name: '', category: '', description: '' },
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
        try {
          await api.post('/clothing-items', this.newItem);
          this.showAddForm = false;
          this.newItem = { name: '', category: '', description: '' };
          this.fetchItems();
        } catch (error) {
          console.error('Failed to add item', error);
        }
      },
      cancelAdd() {
        this.showAddForm = false;
        this.newItem = { name: '', category: '', description: '' };
      },
      async editItem(item) {
        const updatedName = prompt('Edit name:', item.name);
        const updatedCategory = prompt('Edit category:', item.category);
        const updatedDescription = prompt('Edit description:', item.description);
        if (updatedName && updatedCategory) {
          try {
            await api.put(`/clothing-items/${item.id}`, {
              name: updatedName,
              category: updatedCategory,
              description: updatedDescription || item.description,
            });
            this.fetchItems();
          } catch (error) {
            console.error('Failed to update item', error);
          }
        }
      },
      async deleteItem(id) {
        if (confirm('Are you sure you want to delete this item?')) {
          try {
            await api.delete(`/clothing-items/${id}`);
            this.fetchItems();
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