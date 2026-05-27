import type { User, UserApiData } from '../entities/User'

/** Contenido de `data` en POST /auth/register */
export type RegisterResponse = UserApiData

/** Contenido de `data` en POST /auth/login */
export interface LoginResponse {
  user: UserApiData
  accessToken: string
  refreshToken: string
}

/** Resultado de login mapeado al dominio (repositorio → application) */
export type LoginResult = {
  user: User
  accessToken: string
  refreshToken: string
}

/** Contenido de `data` en POST /auth/forgot-password */
export interface ForgotPasswordResponse {
  message: string
}

/** Contenido de `data` en POST /auth/reset-password */
export interface ResetPasswordResponse {
  message: string
}

/** Contenido de `data` en POST /auth/refresh */
export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}
