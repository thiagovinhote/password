import { Either } from '~/common/either'
import { Folder } from '~/domain/models/folder'
import { CreateFolder } from '~/domain/usecases/create-folder'
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

export class ApiCreateFolder
  implements Usecase<CreateFolder.Params, CreateFolder.Result> {
  constructor(
    private readonly httpClient: HttpClient<CreateFolder.ResponseDTO>
  ) {}

  async exec(params: CreateFolder.Params): CreateFolder.Result {
    const response = await this.httpClient.request({
      url: '/folders',
      method: HttpMethodType.post,
      body: { name: params.name }
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
    const folder = Folder.create({
      id: payload.id,
      name: payload.name,
      createdAt: payload.created_at
    })

    return Either.right(folder)
  }
}
