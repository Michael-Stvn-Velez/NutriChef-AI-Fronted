import { ForgotPasswordUseCase } from '@application/useCases/Auth/ForgotPasswordUseCase'
import { GetAuthSessionUseCase } from '@application/useCases/Auth/GetAuthSessionUseCase'
import { LoginUseCase } from '@application/useCases/Auth/LoginUseCase'
import { LogoutUseCase } from '@application/useCases/Auth/LogoutUseCase'
import { RefreshTokenUseCase } from '@application/useCases/Auth/RefreshTokenUseCase'
import { RegisterUseCase } from '@application/useCases/Auth/RegisterUseCase'
import { ResetPasswordUseCase } from '@application/useCases/Auth/ResetPasswordUseCase'
import type { IHttpClient, ISecurityStorage } from '@domain/IPatterns'
import { AxiosHttpClient } from '@infrastructure/api/AxiosHttpClient'
import type { UnauthorizedHandler } from '@infrastructure/api/UnauthorizedHandler'
import { AuthRepository } from '@infrastructure/repositories/AuthRepository'
import { SessionStorageSecurityStorage } from '@infrastructure/storage/SessionStorageSecurityStorage'
import type { AppContainerContextValue } from '@presentation/context/AppContainerContext'

export type AppContainer = AppContainerContextValue & {
  httpClient: IHttpClient
  securityStorage: ISecurityStorage
}

export function createAppContainer(): AppContainer {
  const securityStorage = new SessionStorageSecurityStorage()

  const unauthorizedHandler: UnauthorizedHandler = {
    refreshTokens: async () => {},
    logout: async () => {},
  }

  const httpClient = new AxiosHttpClient(securityStorage, unauthorizedHandler)
  const authRepository = new AuthRepository(httpClient)

  const registerUseCase = new RegisterUseCase(authRepository)
  const loginUseCase = new LoginUseCase(authRepository, securityStorage)
  const forgotPasswordUseCase = new ForgotPasswordUseCase(authRepository)
  const resetPasswordUseCase = new ResetPasswordUseCase(authRepository)
  const refreshTokenUseCase = new RefreshTokenUseCase(authRepository, securityStorage)
  const logoutUseCase = new LogoutUseCase(securityStorage)
  const getAuthSessionUseCase = new GetAuthSessionUseCase(securityStorage)

  unauthorizedHandler.refreshTokens = async () => {
    await refreshTokenUseCase.execute()
  }

  unauthorizedHandler.logout = async () => {
    await logoutUseCase.execute()
  }

  return {
    httpClient,
    securityStorage,
    registerUseCase,
    loginUseCase,
    forgotPasswordUseCase,
    resetPasswordUseCase,
    refreshTokenUseCase,
    logoutUseCase,
    getAuthSessionUseCase,
  }
}
