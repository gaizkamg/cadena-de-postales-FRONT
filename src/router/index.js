import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import HomeView from '@/views/HomeView.vue';
import DashboardView from '@/views/DashboardView.vue';
import AdminView from '@/views/AdminView.vue';
import RegisterView from '@/views/RegisterView.vue';
import InfoView from '@/views/InfoView.vue';


const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
      { path: 'admin', name: 'admin', component: AdminView, meta: { requiresAuth: true } },
      { path: 'register', name: 'Register', component: RegisterView},
      { path: 'info', name: 'info', component: InfoView},
      

    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

