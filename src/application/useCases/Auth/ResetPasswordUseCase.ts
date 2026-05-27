import type { IUseCase } from '@domain/IPatterns'
import type { IAuthRepository } from '@domain/interfaces/IAuthRepository'
import type { ResetPasswordRequest } from '@domain/Request/AuthRequest'
import type { ResetPasswordResponse } from '@domain/Response/AuthResponse'
import {
  assertValidEmail,
  assertValidPassword,
  assertValidResetCode,
  normalizeEmail,
} from './authValidation'

export class ResetPasswordUseCase implements IUseCase<
  ResetPasswordRequest,
  ResetPasswordResponse
> {
  private readonly authRepository: IAuthRepository

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository
  }

  async execute(input: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const email = normalizeEmail(input.email)
    const code = input.code.trim()
    const newPassword = input.newPassword

    assertValidEmail(email)
    assertValidResetCode(code)
    assertValidPassword(newPassword)

    return this.authRepository.resetPassword({ email, code, newPassword })
  }
}
