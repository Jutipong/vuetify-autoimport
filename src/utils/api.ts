import type { AxiosRequestConfig, AxiosRequestTransformer, AxiosResponse } from 'axios'
import axios from 'axios'

import { buildWebStorage, setupCache } from 'axios-cache-interceptor'

const { token } = useAuthStore()

function dateTransformer(data: any): any {
    if (data instanceof Date) {
        // const res = data.toLocaleString()
        const dateObj = new Date(data)
        dateObj.setHours(dateObj.getHours() + 7)
        const res = dateObj.toISOString()
        return res
    }

    if (Array.isArray(data)) {
        return data.map(dateTransformer)
    }

    if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, dateTransformer(value)]))
    }

    return data
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    transformRequest: [dateTransformer, ...(axios.defaults.transformRequest as AxiosRequestTransformer[])],
})

setupCache(axiosInstance, {
    storage: buildWebStorage(sessionStorage, 'axios-cache:'),
    generateKey: req => generateCacheKey(req),
    methods: ['get', 'post'],
    update: config => updateCache(config),
    cachePredicate: config => cachePredicate(config),
})

function cachePredicate(config: any) {
    const excludedStatusCodes = [400, 401, 403, 404, 500]
    return !excludedStatusCodes.includes(config.status)
}

function updateCache(config: any) {
    if (config.config.cacheTimeout) {
        config.config.cache.ttl = _dateTime.TimeConfig(config.config.cacheTimeout)
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

function handleError(err: any) {
    const { resetLoading } = useAppStore()

    let code: any = ''
    let message: string = ''

    if (err.code === 'ECONNABORTED') {
        code = err.code
        message = err.message
    }
    else {
        const res = err?.response
        code = res?.status ?? 500
        message = httpMessage[code] || 'เกิดข้อผิดพลาด'
    }

    // vNotify.error(`status code:${statusCode} | ${message}`)
    _alert.Err(`status code: ${code}`, message)

    resetLoading()

    if (code === 401)
        router.push('/login')

    // if (resError.config.returnError) {
    //     const error = {
    //         status: statusCode,
    //         message,
    //     } as ErrorResponseType

    //     return Promise.resolve({ error })
    // }

    return Promise.reject(err)
}

axiosInstance.interceptors.request.use((config: any) => {
    config.isLoading = config?.isLoading ?? true
    if (config?.isLoading) {
        const { setLoading } = useAppStore()
        setLoading()
    }

    return config
}, handleError)

axiosInstance.interceptors.response.use(({ config, data }: any): AxiosResponse<any, any> => {
    config.isLoading = config?.isLoading ?? true

    if (config?.isLoading) {
        const { unLoading } = useAppStore()
        unLoading()
    }

    // if (config.returnError) {
    //     return { data } as AxiosResponse<any, any>
    // }

    return data
}, handleError)

interface ApiOptions {
    timeout?: TimeConfig
    baseURL?: string
    isLoading?: boolean
    cache?: boolean
    cacheTimeout?: TimeConfig
}

function getDefaultApiConfig(config?: ApiOptions): AxiosRequestConfig {
    if (!config) {
        return {
            timeout: _dateTime.TimeConfig('30sec'),
            cache: false,
        } as AxiosRequestConfig
    }

    return {
        ...config,
        cache: config.cache ?? false,
        timeout: config?.timeout
            ? _dateTime.TimeConfig(config.timeout!)
            : _dateTime.TimeConfig('30sec'),
    } as AxiosRequestConfig
}

export default {
    Get: async <TResponse>(url: string, config?: ApiOptions) => {
        return await axiosInstance.get<any, TResponse>(url, getDefaultApiConfig(config))
    },
    Post: async <TResponse>(url: string, data?: any, config?: ApiOptions) => {
        return await axiosInstance.post<any, TResponse>(url, data, getDefaultApiConfig(config))
    },
    Put: async <TResponse>(url: string, data?: any, config?: ApiOptions) => {
        return await axiosInstance.put<any, TResponse>(url, data, getDefaultApiConfig(config))
    },
    Delete: async <TResponse>(url: string, config?: ApiOptions) => {
        return await axiosInstance.delete<any, TResponse>(url, getDefaultApiConfig(config))
    },
}
