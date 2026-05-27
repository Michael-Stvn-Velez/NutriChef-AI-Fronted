import type { AxiosResponse } from 'axios'

export function axiosResponseToFetchResponse(response: AxiosResponse): Response {
  const headers = new Headers()

  for (const [key, value] of Object.entries(response.headers)) {
    if (value === undefined || value === null) continue

    if (Array.isArray(value)) {
      value.forEach((entry) => headers.append(key, String(entry)))
    } else {
      headers.set(key, String(value))
    }
  }

  const body =
    response.data === undefined || response.data === null
      ? null
      : typeof response.data === 'string'
        ? response.data
        : JSON.stringify(response.data)

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
