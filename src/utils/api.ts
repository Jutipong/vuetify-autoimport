import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'
import type { ApiResponse } from '@/types/common/api-response'

// create axios
const axiosInstance = axios.create({
    baseURL: appSetting.baseUrl,
    timeout: 5000,
    headers: { 'Access-Control-Allow-Origin': '*' },
})

// Define a cache configuration
setupCache(axiosInstance, {
    // 5 minutes
    // ttl: 5 * 60 * 1000, // 30 seconds in milliseconds
    // 30 seconds
    ttl: 30 * 1000, // 30 seconds in milliseconds
})

function handleError(error: any) {
    const globalStore = useGlobalStore()

    const res = error?.response
    vNotify.error(`status:${res?.status ?? 500} | message:${res?.data?.message ?? 'เกิดข้อผิดพลาดบางอย่าง'}`)

    globalStore.resetLoading()

    if (res?.status === 401)
        router.push('/login')

    console.error('API Error:', error)
    return Promise.resolve({
        error: {
            status: res?.status ?? 500,
            message: res?.data?.message ?? 'เกิดข้อผิดพลาดบางอย่าง',
        },
    } as ApiResponse<null>)
}

// Function to generate a unique cache key
function generateCacheKey(config: any) {
    // Basic example: URL + Method
    let key = `${config.url}_${config.method}`

    if (config.params) {
        const params = new URLSearchParams(config.params).toString()
        key += `?${params}`
    }

    // For POST requests, you might want to include the request body
    if (config.data && config.method.toLowerCase() === 'post') {
        key += `_${JSON.stringify(config.data)}`
    }

    return key
}

// request interceptor
axiosInstance.interceptors.request.use((config: any) => {
    config.isLoading = config?.isLoading ?? true

    if (config?.isLoading) {
        const { setLoading } = useGlobalStore()
        setLoading()
    }

    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Content-Type'] = 'application/json'
    config.headers.Authorization = `Bearer ${clientStorages.getToken()}`

    // Cache
    const { useCache } = config
    if (useCache) {
        config.cache = true
        config.cacheKey = generateCacheKey(config)
    }
    else {
        config.cache = false
    }

    // Remove the useCache property to avoid axios warnings
    delete config.useCache

    return config
}, handleError)

// response interceptor
axiosInstance.interceptors.response.use(({ config, data }: any) => {
    config.isLoading = config?.isLoading ?? true

    if (config?.isLoading) {
        const { unLoading } = useGlobalStore()
        unLoading()
    }

    return data
}, handleError)

type ApiOptions = { isLoading?: boolean, useCache?: boolean } & AxiosRequestConfig

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
