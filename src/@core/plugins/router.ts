import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: setupLayouts(routes),
    scrollBehavior() { return { top: 0 } },
})

router.beforeEach((to: any, from: any, next: any) => {
    const $g = useGlobalStore()
    $g.isLoadingPage = true

    if (to.path === '/login') {
        clientStorages.clear()
        return next()
    }

    if (!clientStorages.getToken()) {
        clientStorages.clear()
        return next({ path: '/login' })
    }

    next()
})

router.afterEach(() => {
    const $g = useGlobalStore()
    $g.isLoadingPage = false
})

export default router
