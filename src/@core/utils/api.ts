import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

// const $g = useGlobalStore()

const { getToken } = useLocalStorages
const { baseUrl } = useConstant

// create axios
const _api = axios.create({
  baseURL: baseUrl.api,
  timeout: 5000,
  headers: { 'Access-Control-Allow-Origin': '*' },
})

function err(error: any) {
  const { logOut } = useLoginStore()
  const $g = useGlobalStore()
  const { status, data } = error.response

  vNotify.error(`status:${status} | message:${data?.message ?? 'เกิดข้อผิดพลาดบางอย่าง'}`)

  $g.resetLoading()

  if (status === 401)
    logOut(false)

  return Promise.reject(error)
}

// request interceptor
_api.interceptors.request.use((config: any) => {
  config.isLoading = config?.isLoading ?? true

  if (config?.isLoading) {
    const { setLoading } = useGlobalStore()
    setLoading()
  }

  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Content-Type'] = 'application/json'
  config.headers.Authorization = `Bearer ${getToken()}`

  return config
}, err)

// response interceptor
_api.interceptors.response.use(({ config, data }: any) => {
  config.isLoading = config?.isLoading ?? true

  if (config?.isLoading) {
    const { unLoading } = useGlobalStore()
    unLoading()
  }

  return data
}, err)

type ApiOptions = { isLoading?: boolean } & AxiosRequestConfig

export default {
  get: async <TResponse>(url: string, config?: ApiOptions) => {
    return await _api.get<any, TResponse>(url, config)
  },
  post: async <TResponse>(url: string, data?: any, config?: ApiOptions) => {
    return await _api.post<any, TResponse>(url, data, config)
  },
  put: async <TResponse>(url: string, data?: any, config?: ApiOptions) => {
    return await _api.put<any, TResponse>(url, data, config)
  },
  delete: async <TResponse>(url: string, config?: ApiOptions) => {
    return await _api.delete<any, TResponse>(url, config)
  },
}
