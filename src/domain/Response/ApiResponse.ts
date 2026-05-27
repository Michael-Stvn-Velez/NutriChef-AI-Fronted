import type { ErrorResponse } from './ErrorResponse'

/** Respuesta exitosa del API (`success: true`, cuerpo en `data`). */
export interface ApiSuccessResponse<T> {
  success: true
  data: T
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ErrorResponse
