import { Either } from "~/common/either";
import { Password } from "~/domain/models/password";
import { RevealCredential } from "~/domain/usecases/reveal-credential";
import { Usecase } from "~/domain/usecases/usecase";

import {
  AccessDeniedError,
  InvalidResourceError,
  UnexpectedError,
} from "../errors";
import {
  HttpClient,
  HttpMethodType,
  HttpStatusCode,
} from "../protocols/http/http-client";

export class ApiRevealCredential
  implements Usecase<RevealCredential.Params, RevealCredential.Result>
{
  constructor(
    private readonly httpClient: HttpClient<RevealCredential.ResponseDTO>,
  ) {}

  async exec(params: RevealCredential.Params): RevealCredential.Result {
    const response = await this.httpClient.request({
      url: `/credentials/${params.id}/password`,
      method: HttpMethodType.get,
    });

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        return Either.left(AccessDeniedError.create());
      case HttpStatusCode.notFound:
        return Either.left(InvalidResourceError.create());
      case HttpStatusCode.serverError:
        return Either.left(UnexpectedError.create());
    }

    const payload = response.body;
    const password = Password.create({
      decrypted: payload.decrypted,
    });

    return Either.right(password);
  }
}
