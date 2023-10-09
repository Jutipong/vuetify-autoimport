import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  extendRoutes: (routes) => setupLayouts(routes),
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to: any, from: any, next: any) => {
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
});

export default router;
