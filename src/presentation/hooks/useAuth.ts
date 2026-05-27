import type { ForgotPasswordUseCase } from '@application/useCases/Auth/ForgotPasswordUseCase'
import type { LoginUseCase } from '@application/useCases/Auth/LoginUseCase'
import type { RegisterUseCase } from '@application/useCases/Auth/RegisterUseCase'
import type { ResetPasswordUseCase } from '@application/useCases/Auth/ResetPasswordUseCase'
import { useAppContainer } from '@presentation/context/AppContainerContext'

export function useAuth() {
  const {
    registerUseCase,
    loginUseCase,
    forgotPasswordUseCase,
    resetPasswordUseCase,
    refreshTokenUseCase,
    logoutUseCase,
    getAuthSessionUseCase,
  } = useAppContainer()

  return {
    register: (input: Parameters<RegisterUseCase['execute']>[0]) =>
      registerUseCase.execute(input),
    login: (input: Parameters<LoginUseCase['execute']>[0]) => loginUseCase.execute(input),
    forgotPassword: (input: Parameters<ForgotPasswordUseCase['execute']>[0]) =>
      forgotPasswordUseCase.execute(input),
    resetPassword: (input: Parameters<ResetPasswordUseCase['execute']>[0]) =>
      resetPasswordUseCase.execute(input),
    refreshToken: () => refreshTokenUseCase.execute(),
    logout: () => logoutUseCase.execute(),
    isAuthenticated: () => getAuthSessionUseCase.execute(),
  }
}
