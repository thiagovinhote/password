import { HttpClient, HttpRequest, HttpResponse } from "~/data/protocols/http/http-client";

export class FetchHttpClient implements HttpClient {
  constructor(private readonly baseUrl: string) {}

  async request(params: HttpRequest): Promise<HttpResponse> {
    const url = new URL(params.url, this.baseUrl)

    if (params.params) {
      Object.entries(params.params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    const options = {
      headers: params.headers ?? {},
      method: params.method,
      body: null
    }

    if (params.body) {
      options.headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(params.body)
    }

    const response = await fetch(url.toString(), options)
    const data = await response.json()

    return {
      body: data,
      statusCode: response.status
    }
  }
}
