import type { ISecurityStorage, IUseCase } from '@domain/IPatterns'
import { AuthStorageKeys } from '@domain/constants/authStorageKeys'

export class LogoutUseCase implements IUseCase<undefined, void> {
  private readonly securityStorage: ISecurityStorage

  constructor(securityStorage: ISecurityStorage) {
    this.securityStorage = securityStorage
  }

  async execute(): Promise<void> {
    await this.securityStorage.delete(AuthStorageKeys.ACCESS_TOKEN)
    await this.securityStorage.delete(AuthStorageKeys.REFRESH_TOKEN)
  }
}
