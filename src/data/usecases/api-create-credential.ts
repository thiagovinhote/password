import { Either } from "~/common/either";
import { Credential } from "~/domain/models/credential";
import { CreateCredential } from "~/domain/usecases/create-credential";
import { Usecase } from "~/domain/usecases/usecase";
import { AccessDeniedError, InvalidResourceError, UnexpectedError } from "../errors";
import { HttpClient, HttpMethodType, HttpStatusCode } from "../protocols/http/http-client";

export class ApiCreateCredential implements Usecase<CreateCredential.Params, CreateCredential.Result> {
  constructor(private readonly httpClient: HttpClient<CreateCredential.ResponseDTO>) { }

  async exec(params: CreateCredential.Params): CreateCredential.Result {
    const response = await this.httpClient.request({
      url: '/credentials',
      method: HttpMethodType.post,
      body: {
        name: params.name,
        username: params.username,
        password: params.password,
        description: params.description
      },
      params: { folder_id: params.folderId }
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
    const credential = Credential.create({
      id: payload.id,
      name: payload.name,
      username: payload.username,
      password: payload.password,
      createdAt: payload.created_at
    })

    return Either.right(credential)
  }
}
