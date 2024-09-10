'use client'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { METHODS } from '@/utils/constant'

export const BASE_URL: string = 'https://soundfair-backend.vercel.app/api'

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
}

const createAxiosInstance = () => axios.create(axiosConfig)

const request = createAxiosInstance()
const cache: { [key: string]: any } = {}

interface ClientParams {
  method?: string
  url?: string
  data?: any
  useCache?: boolean
  invalidateQuery?: boolean
  [key: string]: any
}

const client = ({
  method = METHODS.POST,
  url = BASE_URL,
  data,
  useCache = false,
  invalidateQuery = false,
  ...rest
}: ClientParams): Promise<any> =>
  useCache && !invalidateQuery && cache[url]
    ? Promise.resolve(cache[url])
    : request({
      method,
      url,
      data,
      ...rest,
    }).then((res) => {
      if (useCache) {
        cache[url] = res
      }
      return res
    })

export const clientWithHeaders = ({
  method = METHODS.POST,
  url = BASE_URL,
  data,
  useCache = false,
  invalidateQuery = false,
  ...rest
}: ClientParams): Promise<AxiosResponse<any>> =>
  request({
    method,
    url,
    data,
    ...rest,
  }).then((res) => res)

request.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => res,
  (err: any) => {
    const originalRequest = err.config
    const status = err.response?.status
    const response = err.response?.data

    if (status === 503) {
      const error = {
        originalRequest,
        status,
        message:
          'This service is unavailable right now, please try again later',
      }
      throw error
    }
    if (status === 500) {
      const error = {
        originalRequest,
        status,
        message: response?.message
          ? response.message
          : 'An unexpected error occurred, please try again later',
      }
      throw error
    }
    if (status === 404) {
      const error = {
        originalRequest,
        status,
        message: response?.message
          ? response.message
          : 'The requested content does not exist, please try again later',
      }
      throw error
    }
    if (status === 401) {
      localStorage.clear()
      window.history.go(-1)
    }

    const message = response ? response?.message : err.message
    const error = { originalRequest, message, status }
    throw error
  },
)

if (typeof window !== 'undefined') {
  if (window.localStorage.getItem('token')) {
    const token = window.localStorage.getItem('token')
    if (token) {
      request.defaults.headers.Authorization = `Bearer ${token}`
    }
  }
}

export const setHeaderToken = (token: string | null): void => {
  if (token) {
    request.defaults.headers.Authorization = `Bearer ${token}`
  } else {
    delete request.defaults.headers.Authorization
  }
}

export const setHeader = (key: string, value: string): void => {
  if (value) {
    request.defaults.headers[key] = value
  }
}

export default client
