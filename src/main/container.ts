import { ForgotPasswordUseCase } from '@application/useCases/Auth/ForgotPasswordUseCase'
import { GetAuthSessionUseCase } from '@application/useCases/Auth/GetAuthSessionUseCase'
import { LoginUseCase } from '@application/useCases/Auth/LoginUseCase'
import { LogoutUseCase } from '@application/useCases/Auth/LogoutUseCase'
import { RefreshTokenUseCase } from '@application/useCases/Auth/RefreshTokenUseCase'
import { RegisterUseCase } from '@application/useCases/Auth/RegisterUseCase'
import { ResetPasswordUseCase } from '@application/useCases/Auth/ResetPasswordUseCase'
import { CreateRecipeUseCase } from '@application/useCases/Recipe/CreateRecipeUseCase'
import { DeleteRecipeUseCase } from '@application/useCases/Recipe/DeleteRecipeUseCase'
import { GetRecipeByIdUseCase } from '@application/useCases/Recipe/GetRecipeByIdUseCase'
import { ListRecipesUseCase } from '@application/useCases/Recipe/ListRecipesUseCase'
import type { IHttpClient, ISecurityStorage } from '@domain/IPatterns'
import { AxiosHttpClient } from '@infrastructure/api/AxiosHttpClient'
import type { UnauthorizedHandler } from '@infrastructure/api/UnauthorizedHandler'
import { AuthRepository } from '@infrastructure/repositories/AuthRepository'
import { RecipeRepository } from '@infrastructure/repositories/RecipeRepository'
import { SessionStorageSecurityStorage } from '@infrastructure/storage/SessionStorageSecurityStorage'
import type { AppContainerContextValue } from '@presentation/context/AppContainerContext'

export type AppContainer = AppContainerContextValue & {
  httpClient: IHttpClient
  securityStorage: ISecurityStorage
  createRecipeUseCase: CreateRecipeUseCase
  listRecipesUseCase: ListRecipesUseCase
  getRecipeByIdUseCase: GetRecipeByIdUseCase
  deleteRecipeUseCase: DeleteRecipeUseCase
}

export function createAppContainer(): AppContainer {
  const securityStorage = new SessionStorageSecurityStorage()

  const unauthorizedHandler: UnauthorizedHandler = {
    refreshTokens: async () => {},
    logout: async () => {},
  }

  const httpClient = new AxiosHttpClient(securityStorage, unauthorizedHandler)
  const authRepository = new AuthRepository(httpClient)
  const recipeRepository = new RecipeRepository(httpClient)

  const registerUseCase = new RegisterUseCase(authRepository)
  const loginUseCase = new LoginUseCase(authRepository, securityStorage)
  const forgotPasswordUseCase = new ForgotPasswordUseCase(authRepository)
  const resetPasswordUseCase = new ResetPasswordUseCase(authRepository)
  const refreshTokenUseCase = new RefreshTokenUseCase(authRepository, securityStorage)
  const logoutUseCase = new LogoutUseCase(securityStorage)
  const getAuthSessionUseCase = new GetAuthSessionUseCase(securityStorage)
  const createRecipeUseCase = new CreateRecipeUseCase(recipeRepository)
  const listRecipesUseCase = new ListRecipesUseCase(recipeRepository)
  const getRecipeByIdUseCase = new GetRecipeByIdUseCase(recipeRepository)
  const deleteRecipeUseCase = new DeleteRecipeUseCase(recipeRepository)

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
    createRecipeUseCase,
    listRecipesUseCase,
    getRecipeByIdUseCase,
    deleteRecipeUseCase,
  }
}
