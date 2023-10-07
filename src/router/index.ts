// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',

    component: () => import('@/layouts/Empty.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/login.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/index.vue'),
      },
      {
        path: 'demo01',
        name: 'demo01',
        component: () => import('@/views/demo01.vue'),
      },
      {
        path: 'demo02',
        name: 'demo02',
        component: () => import('@/views/demo02.vue'),
      },
      {
        path: 'demo03',
        name: 'demo03',
        component: () => import('@/views/demo03.vue'),
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/product.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/views/error.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
