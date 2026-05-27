import type { IUseCase, ISecurityStorage } from '@domain/IPatterns'
import { AuthStorageKeys } from '@domain/constants/authStorageKeys'
import type { User } from '@domain/entities/User'
import type { IAuthRepository } from '@domain/interfaces/IAuthRepository'
import type { LoginRequest } from '@domain/Request/AuthRequest'
import {
  assertValidEmail,
  assertValidPassword,
  normalizeEmail,
} from './authValidation'

export class LoginUseCase implements IUseCase<LoginRequest, User> {
  private readonly authRepository: IAuthRepository
  private readonly securityStorage: ISecurityStorage

  constructor(authRepository: IAuthRepository, securityStorage: ISecurityStorage) {
    this.authRepository = authRepository
    this.securityStorage = securityStorage
  }

  async execute(input: LoginRequest): Promise<User> {
    const email = normalizeEmail(input.email)
    const password = input.password

    assertValidEmail(email)
    assertValidPassword(password)

    const result = await this.authRepository.login({ email, password })

    await this.securityStorage.set(AuthStorageKeys.ACCESS_TOKEN, result.accessToken)
    await this.securityStorage.set(AuthStorageKeys.REFRESH_TOKEN, result.refreshToken)

    return result.user
  }
}
