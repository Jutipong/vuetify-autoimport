import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
const { userInfKey } = consts;
const { getToken, clearToken, clearUserInfo } = useLocalStorages;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routes) => setupLayouts(routes),
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to: any, from: any, next: any) => {
  if (to.path === '/login') {
    clearToken();
    clearUserInfo();
    return next();
  }

  const token = getToken();
  if (!token) return next({ path: '/login' });

  next();
});

// router.afterEach(() => {
//   // appStore.inprogress = false;
// });

export default router;
