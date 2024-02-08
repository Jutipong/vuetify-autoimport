import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const { getToken, clear: clearLocalStorage } = useLocalStorages

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes),
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to: any, from: any, next: any) => {
  document.title = _const.app.titleName

  if (to.path === '/login') {
    clearLocalStorage()
    return next()
  }

  if (!getToken()) {
    clearLocalStorage()
    return next({ path: '/login' })
  }

  next()
})

export default router
