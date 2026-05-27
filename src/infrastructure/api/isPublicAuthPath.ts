import { API_PATHS } from './apiPaths'

const PUBLIC_AUTH_PATHS = [
  API_PATHS.AUTH.LOGIN,
  API_PATHS.AUTH.REGISTER,
  API_PATHS.AUTH.REFRESH,
  API_PATHS.AUTH.FORGOT_PASSWORD,
  API_PATHS.AUTH.RESET_PASSWORD,
] as const

export function isPublicAuthPath(url?: string): boolean {
  if (!url) return false

  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path))
}
