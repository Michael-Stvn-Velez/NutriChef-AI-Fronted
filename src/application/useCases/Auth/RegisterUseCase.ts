import type { IUseCase } from '@domain/IPatterns'
import type { User } from '@domain/entities/User'
import type { IAuthRepository } from '@domain/interfaces/IAuthRepository'
import type { RegisterRequest } from '@domain/Request/AuthRequest'
import {
  assertValidEmail,
  assertValidName,
  assertValidPassword,
  normalizeEmail,
} from './authValidation'

export class RegisterUseCase implements IUseCase<RegisterRequest, User> {
  private readonly authRepository: IAuthRepository

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository
  }

  async execute(input: RegisterRequest): Promise<User> {
    const name = input.name.trim()
    const email = normalizeEmail(input.email)
    const password = input.password

    assertValidName(name)
    assertValidEmail(email)
    assertValidPassword(password)

    return this.authRepository.register({ name, email, password })
  }
}
