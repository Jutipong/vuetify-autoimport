import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

import { buildWebStorage, setupCache } from 'axios-cache-interceptor'
import type { TimeConfigType } from './dateTime'

const { token } = useAuthStore()

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
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

type ApiOptions = {
    timeout?: number
    baseURL?: string
    isLoading?: boolean
    cache?: boolean
    cacheTimeout?: TimeConfigType
} & AxiosRequestConfig

function getDefaultApiConfig(config?: ApiOptions) {
    const timeOutDefault = _dateTime.TimeConfig('30sec')

    if (!config) {
        return {
            timeout: timeOutDefault,
            cache: false,
        } as ApiOptions
    }

    config.timeout = config.timeout ?? timeOutDefault
    config.cache = config.cache ?? false

    return config
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
