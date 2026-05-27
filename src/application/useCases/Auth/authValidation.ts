import { DomainError } from '@domain/errors/DomainError'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function assertValidEmail(email: string): void {
  if (!email) {
    throw new DomainError('El email es obligatorio', 400)
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new DomainError('Email inválido', 400)
  }
}

export function assertValidPassword(password: string): void {
  if (!password) {
    throw new DomainError('La contraseña es obligatoria', 400)
  }

  if (password.length < 6) {
    throw new DomainError('La contraseña debe tener al menos 6 caracteres', 400)
  }
}

export function assertPasswordsMatch(password: string, confirmPassword: string): void {
  if (!confirmPassword) {
    throw new DomainError('Debes confirmar la contraseña', 400)
  }

  if (password !== confirmPassword) {
    throw new DomainError('Las contraseñas no coinciden', 400)
  }
}

export function assertValidName(name: string): void {
  const trimmed = name.trim()

  if (!trimmed) {
    throw new DomainError('El nombre es obligatorio', 400)
  }

  if (trimmed.length < 3) {
    throw new DomainError('El nombre debe tener al menos 3 caracteres', 400)
  }
}

export function assertValidResetCode(code: string): void {
  const normalized = code.trim()

  if (!/^\d{5}$/.test(normalized)) {
    throw new DomainError('El código debe tener 5 dígitos', 400)
  }
}
