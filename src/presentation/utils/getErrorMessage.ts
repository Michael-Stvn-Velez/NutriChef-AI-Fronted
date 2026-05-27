import { DomainError } from '@domain/errors/DomainError'

export function getErrorMessage(error: unknown): string {
  if (error instanceof DomainError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Ocurrió un error inesperado'
}
