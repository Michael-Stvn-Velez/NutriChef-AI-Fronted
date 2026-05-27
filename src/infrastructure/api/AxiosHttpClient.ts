import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import type { IHttpClient, ISecurityStorage } from '@domain/IPatterns'
import { AuthStorageKeys } from '@domain/constants/authStorageKeys'
import { DomainError } from '@domain/errors/DomainError'
import { env } from '@infrastructure/config/env'
import { isPublicAuthPath } from '@infrastructure/api/isPublicAuthPath'
import type { UnauthorizedHandler } from '@infrastructure/api/UnauthorizedHandler'
import { runTokenRefresh } from '@infrastructure/api/tokenRefreshQueue'
import { axiosResponseToFetchResponse } from './axiosResponseToFetchResponse'

type RetryableAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

export class AxiosHttpClient implements IHttpClient {
  private readonly client: AxiosInstance

  constructor(
    securityStorage?: ISecurityStorage,
    unauthorizedHandler?: UnauthorizedHandler,
  ) {

    this.client = axios.create({
      baseURL: env.apiBaseUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      validateStatus: () => true,
    })

    if (securityStorage) {
      this.client.interceptors.request.use(async (config) => {
        const token = await securityStorage.get(AuthStorageKeys.ACCESS_TOKEN)

        if (token) {
          config.headers.set('Authorization', `Bearer ${token}`)
        }

        return config
      })
    }

    if (securityStorage && unauthorizedHandler) {
      this.client.interceptors.response.use(async (response) => {
        const originalRequest = response.config as RetryableAxiosRequestConfig

        if (response.status !== 401) {
          return response
        }

        if (isPublicAuthPath(originalRequest.url)) {
          return response
        }

        if (originalRequest._retry) {
          return response
        }

        originalRequest._retry = true

        try {
          await runTokenRefresh(unauthorizedHandler.refreshTokens)

          const newToken = await securityStorage.get(AuthStorageKeys.ACCESS_TOKEN)

          if (newToken) {
            originalRequest.headers.set('Authorization', `Bearer ${newToken}`)
          }

          return this.client.request(originalRequest)
        } catch {
          await unauthorizedHandler.logout()
          return response
        }
      })
    }
  }

  private async execute(
    request: () => Promise<AxiosResponse>,
  ): Promise<Response> {
    try {
      const response = await request()
      return axiosResponseToFetchResponse(response)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return axiosResponseToFetchResponse(error.response)
      }

      throw new DomainError('No se pudo conectar con el servidor', 503)
    }
  }

  GET(
    path: string,
    queryparams?: object,
    headers?: Record<string, string>,
  ): Promise<Response> {
    return this.execute(() => this.client.get(path, { params: queryparams, headers }))
  }

  POST(
    path: string,
    body?: object,
    headers?: Record<string, string>,
  ): Promise<Response> {
    return this.execute(() => this.client.post(path, body, { headers }))
  }

  PUT(
    path: string,
    body?: object,
    headers?: Record<string, string>,
  ): Promise<Response> {
    return this.execute(() => this.client.put(path, body, { headers }))
  }

  DELETE(path: string, headers?: Record<string, string>): Promise<Response> {
    return this.execute(() => this.client.delete(path, { headers }))
  }
}
