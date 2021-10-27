import { HttpClient, HttpRequest, HttpResponse } from "~/data/protocols/http/http-client";
import { parseCookies } from 'nookies'

export class AuthorizationHttpClient implements HttpClient {
  constructor(private readonly httpClient: HttpClient, private readonly cookies: Record<string, string>) {}

  request(params: HttpRequest): Promise<HttpResponse> {
    const headers = params.headers ?? {}
    const { 'password:token': token } = this.cookies;

    headers['Authorization'] = `Bearer ${token}`;
    params.headers = headers

    return this.httpClient.request(params)
  }
}
