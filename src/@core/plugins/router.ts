import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const { getToken, clearLocalStorage } = useLocalStorages

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes),
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to: any, from: any, next: any) => {
  document.title = 'TCRB'

  if (to.path === '/login') {
    clearLocalStorage()
    return next()
  }

  if (!getToken())
    return next({ path: '/login' })

  next()
})

export default router
