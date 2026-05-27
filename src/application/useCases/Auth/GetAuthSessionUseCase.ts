import type { ISecurityStorage, IUseCase } from '@domain/IPatterns'
import { AuthStorageKeys } from '@domain/constants/authStorageKeys'

export class GetAuthSessionUseCase implements IUseCase<undefined, boolean> {
  private readonly securityStorage: ISecurityStorage

  constructor(securityStorage: ISecurityStorage) {
    this.securityStorage = securityStorage
  }

  async execute(): Promise<boolean> {
    const token = await this.securityStorage.get(AuthStorageKeys.ACCESS_TOKEN)
    return token !== null && token.length > 0
  }
}
