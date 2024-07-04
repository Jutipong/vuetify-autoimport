import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { buildWebStorage, setupCache } from 'axios-cache-interceptor'
import type { ErrorResponse } from '@/types/common/api-response'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    headers: { 'Access-Control-Allow-Origin': '*' },
})

setupCache(axiosInstance, {
    storage: buildWebStorage(sessionStorage, 'axios-cache:'),
    generateKey: req => generateCacheKey(req),
    methods: ['get', 'post'],
    update: config => updateCache(config),
    cachePredicate: config => cachePredicate(config),
})

function cachePredicate(config: any) {
    return (config.status !== 400 && config.status !== 401 && config.status !== 403 && config.status !== 404 && config.status !== 500)
}

function updateCache(config: any) {
    if (config.config.cacheTimeout) {
        config.config.cache.ttl = getCacheTimeout(config.config.cacheTimeout)
    }
}

function getCacheTimeout(timeout: CacheTimeout) {
    switch (timeout) {
        case '30sec':
            return 30 * 1000
        case '1min':
            return 60 * 1000
        case '5min':
            return 5 * 60 * 1000
        case '10min':
            return 10 * 60 * 1000
        case '15min':
            return 15 * 60 * 1000
        case '30min':
            return 30 * 60 * 1000
        case '1hour':
            return 60 * 60 * 1000
        default:
            return 0
    }
}

function generateCacheKey(config: any) {
    let key = `${config.url}_${config.method}`

    if (config.params) {
        const params = new URLSearchParams(config.params).toString()
        key += `?${params}`
    }

    if (config.data && config.method.toLowerCase() === 'post') {
        key += `_${JSON.stringify(config.data)}`
    }

    return key
}

function handleError(error: any) {
    const { resetLoading } = useAppStore()

    const res = error?.response
    vNotify.error(`status:${res?.status ?? 500} | message:${res?.data?.message ?? 'เกิดข้อผิดพลาดบางอย่าง'}`)

    resetLoading()

    if (res?.status === 401)
        router.push('/login')

    return Promise.resolve({
        error: {
            status: res?.status ?? 500,
            message: res?.data?.message ?? 'เกิดข้อผิดพลาดบางอย่าง',
        } as ErrorResponse,
    })

    // return Promise.reject(error)
}

axiosInstance.interceptors.request.use((config: any) => {
    const { token } = useAuthStore()

    config.isLoading = config?.isLoading ?? true

    if (config?.isLoading) {
        const { setLoading } = useAppStore()
        setLoading()
    }

    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Content-Type'] = 'application/json'
    config.headers.Authorization = `Bearer ${token}`

    const { useCache } = config
    if (useCache) {
        config.cache = true
    }
    else {
        config.cache = false
    }

    // Remove the useCache property to avoid axios warnings
    // delete config.useCache

    return config
}, handleError)

axiosInstance.interceptors.response.use(({ config, data }: any): AxiosResponse<any, any> => {
    config.isLoading = config?.isLoading ?? true

    if (config?.isLoading) {
        const { unLoading } = useAppStore()
        unLoading()
    }

    return { data } as AxiosResponse<any, any>
}, handleError)

type CacheTimeout = '30sec' | '1min' | '5min' | '10min' | '15min' | '30min' | '1hour'

type ApiOptions = {
    isLoading?: boolean
    useCache?: boolean
    cacheTimeout?: CacheTimeout
} & AxiosRequestConfig

export default {
    get: async <TResponse>(url: string, config?: ApiOptions) => {
        return await axiosInstance.get<any, TResponse>(url, config)
    },
    post: async <TResponse>(url: string, data?: any, config?: ApiOptions) => {
        return await axiosInstance.post<any, TResponse>(url, data, config)
    },
    put: async <TResponse>(url: string, data?: any, config?: ApiOptions) => {
        return await axiosInstance.put<any, TResponse>(url, data, config)
    },
    delete: async <TResponse>(url: string, config?: ApiOptions) => {
        return await axiosInstance.delete<any, TResponse>(url, config)
    },
}
