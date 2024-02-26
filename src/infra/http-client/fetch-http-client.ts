import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "~/data/protocols/http/http-client";

export class FetchHttpClient implements HttpClient {
  constructor(private readonly baseUrl: string) {}

  private async bodyParser(response: Response): Promise<any> {
    try {
      const data = await response.json();
      return data;
    } catch {
      return null;
    }
  }

  async request(params: HttpRequest): Promise<HttpResponse> {
    const url = new URL(params.url, this.baseUrl);

    if (params.params) {
      Object.entries(params.params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((nestedValue) => {
            url.searchParams.append(key.concat("[]"), nestedValue);
          });
        } else {
          url.searchParams.append(key, value);
        }
      });
    }

    const options = {
      headers: params.headers ?? {},
      method: params.method,
      body: null,
    };

    if (params.body && params.body instanceof FormData) {
      options.body = params.body;
    } else if (params.body && params.body === Object(params.body)) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(params.body);
    }

    const response = await fetch(url.toString(), options);
    const data = await this.bodyParser(response);

    return {
      body: data,
      statusCode: response.status,
    };
  }
}
