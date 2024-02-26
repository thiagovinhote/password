import { Either } from "~/common/either";
import { AuthLogout } from "~/domain/usecases/auth-logout";
import { Usecase } from "~/domain/usecases/usecase";

import {
  AccessDeniedError,
  InvalidCredentialsError,
  InvalidResourceError,
  UnexpectedError,
} from "../errors";
import {
  HttpClient,
  HttpMethodType,
  HttpStatusCode,
} from "../protocols/http/http-client";

export class ApiAuthLogout
  implements Usecase<AuthLogout.Params, AuthLogout.Result>
{
  constructor(
    private readonly httpClient: HttpClient<AuthLogout.ResponseDTO>,
  ) {}

  async exec(): AuthLogout.Result {
    const response = await this.httpClient.request({
      url: "/auth/logout",
      method: HttpMethodType.post,
    });

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        return Either.left(AccessDeniedError.create());
      case HttpStatusCode.unauthorized:
        return Either.left(InvalidCredentialsError.create());
      case HttpStatusCode.notFound:
        return Either.left(InvalidResourceError.create());
      case HttpStatusCode.serverError:
        return Either.left(UnexpectedError.create());
    }

    return Either.right(undefined);
  }
}
