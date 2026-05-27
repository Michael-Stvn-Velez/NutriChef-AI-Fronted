export class DomainError extends Error {
  readonly statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.name = 'DomainError'
    this.statusCode = statusCode
  }
}
