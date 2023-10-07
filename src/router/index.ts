// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';

const routes = [
  {
    path: '/login',

    component: () => import('@/layouts/empty.vue'),
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
    component: () => import('@/layouts/default.vue'),
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
  // {
  //   path: '/logout',
  //   component: {
  //     beforeRouteEnter(to, from, next) {
  //       const appStore = useAppStore();
  //       appStore.SignOut();

  //       next('/login');
  //     },
  //   },
  // },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/views/error.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to: any, from: any, next: any) => {
  console.log('to: ', to);
  console.log('from: ', from);
  next();
  // to and from are both route objects. must call `next`.
  // appStore.inprogress = true;

  // if (to.matched.some((record) => record.meta.auth)) {
  //   console.log('require => auth');
  //   if (appStore.isAuthenticated) {
  //     if (
  //       appStore.menus.some((menu) =>
  //         menu.items.some((item) => item.route == to.path)
  //       )
  //     ) {
  //       next();
  //     } else {
  //       const category = appStore.menus.slice(0, 1).shift();
  //       const menu = category?.items.slice(0, 1).shift();
  //       const path = menu?.route;

  //       next(path as string);
  //     }
  //   } else {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath },
  //     });
  //   }
  // } else {
  //   console.log('no-require=> auth');
  //   next();
  // }
});

router.afterEach(() => {
  // appStore.inprogress = false;
  console.log('afterEach');
});

export default router;
