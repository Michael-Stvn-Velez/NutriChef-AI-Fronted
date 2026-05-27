export interface IUseCase<I, O> {
  execute(input: I): Promise<O>
}

export interface IHttpClient {
  GET(
    path: string,
    queryparams?: object,
    headers?: Record<string, string>,
  ): Promise<Response>
  POST(
    path: string,
    body?: object,
    headers?: Record<string, string>,
  ): Promise<Response>
  PUT(
    path: string,
    body?: object,
    headers?: Record<string, string>,
  ): Promise<Response>
  DELETE(path: string, headers?: Record<string, string>): Promise<Response>
}

export interface ISecurityStorage {
  get(key: string): Promise<string | null>
  set(key: string, value: string): Promise<void>
  delete(key: string): Promise<void>
  clear(): Promise<void>
}
