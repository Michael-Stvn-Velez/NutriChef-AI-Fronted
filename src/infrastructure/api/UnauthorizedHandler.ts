export type UnauthorizedHandler = {
  refreshTokens: () => Promise<void>
  logout: () => Promise<void>
}
