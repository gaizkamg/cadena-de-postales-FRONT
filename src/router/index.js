import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import HomeView from '@/views/HomeView.vue';
import DashboardView from '@/views/DashboardView.vue';
import AdminView from '@/views/AdminView.vue';
import UserFormView from '@/views/UserFormView.vue';
import InfoView from '@/views/InfoView.vue';
import LoginView from '@/views/LoginView.vue';


const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
      { path: 'admin', name: 'admin', component: AdminView, meta: { requiresAuth: true } },
      { path: 'register', name: 'register', component: UserFormView },
      { path: 'login', name: 'login', component: LoginView },
      { path: 'info', name: 'info', component: InfoView},
      

    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next('/'); // Redirigir a la página de inicio si no está autenticado
  } else {
    next(); // Continuar con la navegación
  }
});

export default router;

