import { DomainError } from '@domain/errors/DomainError'
import type { ApiResponse, ApiSuccessResponse } from '@domain/Response/ApiResponse'
import type { ErrorResponse } from '@domain/Response/ErrorResponse'

export async function parseApiResponse<T>(response: Response): Promise<T> {
  let json: ApiResponse<T>

  try {
    json = (await response.json()) as ApiResponse<T>
  } catch {
    throw new DomainError(
      'Respuesta inválida del servidor',
      response.status > 0 ? response.status : 502,
    )
  }

  if (!response.ok || !json.success) {
    const apiError = json as ErrorResponse
    throw new DomainError(
      apiError.error ?? 'Error en la solicitud',
      apiError.code ?? response.status,
    )
  }

  return (json as ApiSuccessResponse<T>).data
}
