import type { IUseCase, ISecurityStorage } from '@domain/IPatterns'
import { AuthStorageKeys } from '@domain/constants/authStorageKeys'
import { DomainError } from '@domain/errors/DomainError'
import type { IAuthRepository } from '@domain/interfaces/IAuthRepository'

export class RefreshTokenUseCase implements IUseCase<undefined, void> {
  private readonly authRepository: IAuthRepository
  private readonly securityStorage: ISecurityStorage

  constructor(authRepository: IAuthRepository, securityStorage: ISecurityStorage) {
    this.authRepository = authRepository
    this.securityStorage = securityStorage
  }

  async execute(): Promise<void> {
    const refreshToken = await this.securityStorage.get(AuthStorageKeys.REFRESH_TOKEN)

    if (!refreshToken) {
      throw new DomainError('Sesión expirada', 401)
    }

    const tokens = await this.authRepository.refreshToken({ refreshToken })

    await this.securityStorage.set(AuthStorageKeys.ACCESS_TOKEN, tokens.accessToken)
    await this.securityStorage.set(AuthStorageKeys.REFRESH_TOKEN, tokens.refreshToken)
  }
}
