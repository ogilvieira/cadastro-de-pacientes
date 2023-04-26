import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/authStore';


const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('@/pages/auth/Login.vue'),
        meta: {
          title: 'Bem Vindo'
        }
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'dashboard' },
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'patients',
        component: () => import('@/pages/patients/List.vue'),
        meta: {
          title: "Pacientes"
        }
      },
      {
        path: '/patient/:id',
        name: 'patient-detail',
        component: () => import('@/pages/patients/Detail.vue'),
        meta: {
          title: "Detalhe do Paciente"
        }
      },
      {
        path: '/patient/:id/edit',
        name: 'patient-edit',
        component: () => import('@/pages/patients/Edit.vue'),
        meta: {
          title: "Editar dados de Paciente"
        }
      },
      {
        path: '/patient/create',
        name: 'patient-create',
        component: () => import('@/pages/patients/Edit.vue'),
        meta: {
          title: "Cadastrar Paciente"
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title || '';
  if (title) {
    document.title = title
  }

  const publicPages = ['/auth'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
      next({ name: 'login' });
  } else {
    next();
  }


})


export default router
