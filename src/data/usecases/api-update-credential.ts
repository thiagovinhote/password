import { Either } from '~/common/either'
import { Credential } from '~/domain/models/credential'
import { UpdateCredential } from '~/domain/usecases/update-credential'
import { Usecase } from '~/domain/usecases/usecase'
import {
  AccessDeniedError,
  InvalidResourceError,
  UnexpectedError
} from '../errors'
import {
  HttpClient,
  HttpMethodType,
  HttpStatusCode
} from '../protocols/http/http-client'

export class ApiUpdateCredential
  implements Usecase<UpdateCredential.Params, UpdateCredential.Result> {
  constructor(
    private readonly httpClient: HttpClient<UpdateCredential.ResponseDTO>
  ) {}

  async exec(params: UpdateCredential.Params): UpdateCredential.Result {
    const response = await this.httpClient.request({
      url: `/credentials/${params.id}`,
      method: HttpMethodType.put,
      body: {
        name: params.payload.name,
        username: params.payload.username,
        password: params.payload.password,
        description: params.payload.description
      }
    })

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        return Either.left(AccessDeniedError.create())
      case HttpStatusCode.notFound:
        return Either.left(InvalidResourceError.create())
      case HttpStatusCode.serverError:
        return Either.left(UnexpectedError.create())
    }

    const payload = response.body
    const credential = Credential.create({
      id: payload.id,
      name: payload.name,
      username: payload.username,
      createdAt: payload.created_at
    })

    return Either.right(credential)
  }
}
