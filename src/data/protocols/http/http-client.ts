export interface HttpClient<T = any> {
  request: (params: HttpRequest) => Promise<HttpResponse<T>>
}

export enum HttpStatusCode {
  ok = 200,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
  unprocessableEntity = 422
}

export enum HttpMethodType {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE'
}

export type HttpRequest = {
  url: string
  method: HttpMethodType
  body?: Record<string, unknown>
  params?: { [key: string]: string | string[] }
  headers?: { [key: string]: string }
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
