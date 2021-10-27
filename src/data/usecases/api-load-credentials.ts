import { Either } from "~/common/either";
import { Credential } from "~/domain/models/credential";
import { LoadCredentials } from "~/domain/usecases/load-credentials";
import { Usecase } from "~/domain/usecases/usecase";
import { AccessDeniedError, InvalidResourceError, UnexpectedError } from "../errors";
import { HttpClient, HttpMethodType, HttpStatusCode } from "../protocols/http/http-client";

export class ApiLoadCredentials implements Usecase<never, LoadCredentials.Result> {
  constructor(private readonly httpClient: HttpClient<LoadCredentials.ResponseDTO>) { }

  async exec(): LoadCredentials.Result {
    const response = await this.httpClient.request({
      url: '/credentials',
      method: HttpMethodType.get,
    })

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        return Either.left(AccessDeniedError.create())
      case HttpStatusCode.notFound:
        return Either.left(InvalidResourceError.create())
      case HttpStatusCode.serverError:
        return Either.left(UnexpectedError.create())
    }

    const payload = response.body;
    const credentials = Array.from(
      payload,
      (item) => Credential.create({
        id: item.id,
        name: item.name,
        username: item.username,
        description: item.description,
        password: item.password,
        createdAt: item.created_at
      }))

    return Either.right(credentials)
  }
}
