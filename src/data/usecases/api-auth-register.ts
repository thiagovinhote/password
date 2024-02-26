import { Either } from "~/common/either";
import { User } from "~/domain/models/user";
import { AuthRegister } from "~/domain/usecases/auth-register";
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

export class ApiAuthRegister
  implements Usecase<AuthRegister.Params, AuthRegister.Result>
{
  constructor(
    private readonly httpClient: HttpClient<AuthRegister.ResponseDTO>,
  ) {}

  async exec(params: AuthRegister.Params): AuthRegister.Result {
    const response = await this.httpClient.request({
      url: "/auth/register",
      method: HttpMethodType.post,
      body: {
        name: params.name,
        email: params.email,
        password: params.password,
      },
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

    const payload = response.body;
    const user = User.create({
      id: payload.id,
      email: payload.email,
      name: payload.name,
    });

    return Either.right(user);
  }
}
