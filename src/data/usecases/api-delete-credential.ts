import { Either } from '~/common/either'
import { DeleteCredential } from '~/domain/usecases/delete-credential'
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

export class ApiDeleteCredential
  implements Usecase<DeleteCredential.Params, DeleteCredential.Result> {
  constructor(
    private readonly httpClient: HttpClient<DeleteCredential.ResponseDTO>
  ) {}

  async exec(params: DeleteCredential.Params): DeleteCredential.Result {
    const response = await this.httpClient.request({
      url: `/credentials/${params.id}`,
      method: HttpMethodType.delete
    })

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        return Either.left(AccessDeniedError.create())
      case HttpStatusCode.notFound:
        return Either.left(InvalidResourceError.create())
      case HttpStatusCode.serverError:
        return Either.left(UnexpectedError.create())
    }

    return Either.right(undefined)
  }
}
