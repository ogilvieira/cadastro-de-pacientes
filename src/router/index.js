import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('@/pages/auth/login/Login.vue'),
      },
    ]
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardLayout
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
