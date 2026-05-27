let refreshPromise: Promise<void> | null = null

export function runTokenRefresh(refresh: () => Promise<void>): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = refresh().finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}
