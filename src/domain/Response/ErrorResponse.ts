/** Respuesta de error del API (alineada con el backend). */
export interface ErrorResponse {
  code: number
  success: false
  error: string
}
