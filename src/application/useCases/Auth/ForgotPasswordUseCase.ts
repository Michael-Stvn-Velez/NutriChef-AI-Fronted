import type { IUseCase } from '@domain/IPatterns'
import type { IAuthRepository } from '@domain/interfaces/IAuthRepository'
import type { ForgotPasswordRequest } from '@domain/Request/AuthRequest'
import type { ForgotPasswordResponse } from '@domain/Response/AuthResponse'
import { assertValidEmail, normalizeEmail } from './authValidation'

export class ForgotPasswordUseCase implements IUseCase<
  ForgotPasswordRequest,
  ForgotPasswordResponse
> {
  private readonly authRepository: IAuthRepository

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository
  }

  async execute(input: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const email = normalizeEmail(input.email)
    assertValidEmail(email)

    return this.authRepository.forgotPassword({ email })
  }
}
