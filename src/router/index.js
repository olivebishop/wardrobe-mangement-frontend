import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/login.vue';
import Register from '../views/register.vue';
import Wardrobe from '../views/wardrobe.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { 
    path: '/wardrobe', 
    component: Wardrobe, 
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) next('/login');
      else next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;