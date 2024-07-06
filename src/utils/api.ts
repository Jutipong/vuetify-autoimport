import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { buildWebStorage, setupCache } from 'axios-cache-interceptor'

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
    const excludedStatusCodes = [400, 401, 403, 404, 500]
    return !excludedStatusCodes.includes(config.status)
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
        case '2hour':
            return 2 * 60 * 60 * 1000
        case '3hour':
            return 3 * 60 * 60 * 1000
        case '4hour':
            return 4 * 60 * 60 * 1000
        case '5hour':
            return 5 * 60 * 60 * 1000
        case '6hour':
            return 6 * 60 * 60 * 1000
        case '7hour':
            return 7 * 60 * 60 * 1000
        case '8hour':
            return 8 * 60 * 60 * 1000
        case '9hour':
            return 9 * 60 * 60 * 1000
        case '10hour':
            return 10 * 60 * 60 * 1000
        case '11hour':
            return 11 * 60 * 60 * 1000
        case '12hour':
            return 12 * 60 * 60 * 1000
        case '1day':
            return 24 * 60 * 60 * 1000
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

function handleError(resError: any) {
    const { resetLoading } = useAppStore()

    console.error('api response error', resError)

    const res = resError?.response
    const statusCode = res?.status ?? '500'
    const message = getErrorMessage(statusCode)

    // vNotify.error(`status code:${statusCode} | ${message}`)
    vAlert.error(`status code: ${statusCode}`, message)

    resetLoading()

    if (statusCode === 401)
        router.push('/login')

    // if (resError.config.returnError) {
    //     const error = {
    //         status: statusCode,
    //         message,
    //     } as ErrorResponse

    //     return Promise.resolve({ error })
    // }

    return Promise.reject(resError)
}

const errorMessages: { [key: number]: string } = {
    401: 'ไม่มีสิทธิ์ในการเข้าถึง (401)',
    403: 'การเข้าถึงถูกปฏิเสธ (403)',
    404: 'ไม่พบบริการ (404)',
    408: 'คำขอหมดเวลา (408)',
    500: 'ข้อผิดพลาดของเซิร์ฟเวอร์ (500)',
    501: 'ไม่ได้ใช้บริการ (501)',
    502: 'ข้อผิดพลาดของเครือข่าย (502)',
    503: 'ไม่สามารถให้บริการได้ (503)',
    504: 'เครือข่ายหมดเวลา (504)',
    505: 'ไม่รองรับเวอร์ชัน HTTP (505)',
}

function getErrorMessage(statusCode: number) {
    return errorMessages[statusCode] || 'เกิดข้อผิดพลาด'
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
    delete config.useCache

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

type CacheTimeout = '30sec' | '1min' | '5min' | '10min' | '15min' | '30min'
    | '1hour' | '2hour' | '3hour' | '4hour' | '5hour' | '6hour' | '7hour' | '8hour'
    | '9hour' | '10hour' | '11hour' | '12hour' | '1day'

type ApiOptions = {
    returnError?: boolean
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
