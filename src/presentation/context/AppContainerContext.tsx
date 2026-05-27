import type { ForgotPasswordUseCase } from '@application/useCases/Auth/ForgotPasswordUseCase'
import type { GetAuthSessionUseCase } from '@application/useCases/Auth/GetAuthSessionUseCase'
import type { LoginUseCase } from '@application/useCases/Auth/LoginUseCase'
import type { LogoutUseCase } from '@application/useCases/Auth/LogoutUseCase'
import type { RefreshTokenUseCase } from '@application/useCases/Auth/RefreshTokenUseCase'
import type { RegisterUseCase } from '@application/useCases/Auth/RegisterUseCase'
import type { ResetPasswordUseCase } from '@application/useCases/Auth/ResetPasswordUseCase'
import type { CreateRecipeUseCase } from '@application/useCases/Recipe/CreateRecipeUseCase'
import type { DeleteRecipeUseCase } from '@application/useCases/Recipe/DeleteRecipeUseCase'
import type { GetRecipeByIdUseCase } from '@application/useCases/Recipe/GetRecipeByIdUseCase'
import type { ListRecipesUseCase } from '@application/useCases/Recipe/ListRecipesUseCase'
import { createContext, useContext } from 'react'

export type AppContainerContextValue = {
  registerUseCase: RegisterUseCase
  loginUseCase: LoginUseCase
  forgotPasswordUseCase: ForgotPasswordUseCase
  resetPasswordUseCase: ResetPasswordUseCase
  refreshTokenUseCase: RefreshTokenUseCase
  logoutUseCase: LogoutUseCase
  getAuthSessionUseCase: GetAuthSessionUseCase
  createRecipeUseCase: CreateRecipeUseCase
  listRecipesUseCase: ListRecipesUseCase
  getRecipeByIdUseCase: GetRecipeByIdUseCase
  deleteRecipeUseCase: DeleteRecipeUseCase
}

export const AppContainerContext = createContext<AppContainerContextValue | null>(null)

export function useAppContainer(): AppContainerContextValue {
  const context = useContext(AppContainerContext)

  if (!context) {
    throw new Error('useAppContainer debe usarse dentro de AppProvider')
  }

  return context
}
