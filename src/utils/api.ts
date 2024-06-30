import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { buildWebStorage, setupCache } from 'axios-cache-interceptor'
import type { ErrorResponse } from '@/types/common/api-response'

const axiosInstance = axios.create({
    baseURL: appSetting.baseUrl,
    timeout: 5000,
    headers: { 'Access-Control-Allow-Origin': '*' },
})

setupCache(axiosInstance, {
    ttl: 5 * 60 * 1000,
    storage: buildWebStorage(sessionStorage, 'axios-cache:'),
    generateKey: req => generateCacheKey(req),
})

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
    config.isLoading = config?.isLoading ?? true

    if (config?.isLoading) {
        const { setLoading } = useAppStore()
        setLoading()
    }

    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Content-Type'] = 'application/json'
    config.headers.Authorization = `Bearer ${clientStorages.getToken()}`

    const { useCache } = config
    if (useCache) {
        config.cache = true
    }
    else {
        config.cache = false
    }

    // Remove the useCache property to avoid axios warnings
    delete config.useCache

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
