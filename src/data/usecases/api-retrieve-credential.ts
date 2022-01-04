import { Either } from "~/common/either";
import { Credential } from "~/domain/models/credential";
import { RetrieveCredential } from "~/domain/usecases/retrieve-credential";
import { Usecase } from "~/domain/usecases/usecase";
import { AccessDeniedError, InvalidResourceError, UnexpectedError } from "../errors";
import { HttpClient, HttpMethodType, HttpStatusCode } from "../protocols/http/http-client";

export class ApiRetrieveCredential implements Usecase<RetrieveCredential.Params, RetrieveCredential.Result> {
  constructor(private readonly httpClient: HttpClient<RetrieveCredential.ResponseDTO>) { }

  async exec(params: RetrieveCredential.Params): RetrieveCredential.Result {
    const response = await this.httpClient.request({
      url: `/credentials/${params.id}`,
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
    const credential = Credential.create({
      id: payload.id,
      name: payload.name,
      username: payload.username,
      description: payload.description,
      createdAt: payload.created_at,
      folders: payload.folders?.map(folder => ({id: folder.id, name: folder.name, createdAt: folder.created_at}))
    })

    return Either.right(credential)
  }
}
