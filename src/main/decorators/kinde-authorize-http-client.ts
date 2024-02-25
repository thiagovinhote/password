import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "~/data/protocols/http/http-client";

export class KindeAuthorizeHttpClient implements HttpClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly token: string,
  ) {}

  request(params: HttpRequest): Promise<HttpResponse> {
    const headers = params.headers ?? {};

    headers.Authorization = `Bearer ${this.token}`;
    params.headers = headers;

    return this.httpClient.request(params);
  }
}
