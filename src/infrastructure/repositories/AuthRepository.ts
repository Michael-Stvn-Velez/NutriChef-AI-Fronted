import type { IHttpClient } from '@domain/IPatterns'
import { User as UserEntity } from '@domain/entities/User'
import type { User } from '@domain/entities/User'
import type {
  IAuthRepository,
} from '@domain/interfaces/IAuthRepository'
import type {
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '@domain/Request/AuthRequest'
import type {
  ForgotPasswordResponse,
  LoginResponse,
  LoginResult,
  RefreshTokenResponse,
  RegisterResponse,
  ResetPasswordResponse,
} from '@domain/Response/AuthResponse'

import { API_PATHS } from '@infrastructure/api/apiPaths'
import { parseApiResponse } from '@infrastructure/api/parseApiResponse'

export class AuthRepository implements IAuthRepository {
  private readonly httpClient: IHttpClient

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient
  }

  async register(request: RegisterRequest): Promise<User> {
    const response = await this.httpClient.POST(API_PATHS.AUTH.REGISTER, request)
    const data = await parseApiResponse<RegisterResponse>(response)
    return UserEntity.fromApi(data)
  }

  async login(request: LoginRequest): Promise<LoginResult> {
    const response = await this.httpClient.POST(API_PATHS.AUTH.LOGIN, request)
    const data = await parseApiResponse<LoginResponse>(response)

    return {
      user: UserEntity.fromApi(data.user),
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }
  }

  async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await this.httpClient.POST(API_PATHS.AUTH.REFRESH, request)
    return parseApiResponse<RefreshTokenResponse>(response)
  }

  async forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const response = await this.httpClient.POST(API_PATHS.AUTH.FORGOT_PASSWORD, request)
    return parseApiResponse<ForgotPasswordResponse>(response)
  }

  async resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await this.httpClient.POST(API_PATHS.AUTH.RESET_PASSWORD, request)
    return parseApiResponse<ResetPasswordResponse>(response)
  }
}
