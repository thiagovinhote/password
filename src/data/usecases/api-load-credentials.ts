import { Either } from '~/common/either'
import { Credential } from '~/domain/models/credential'
import { Paginator } from '~/domain/models/paginator'
import { LoadCredentials } from '~/domain/usecases/load-credentials'
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

export class ApiLoadCredentials
  implements Usecase<LoadCredentials.Params, LoadCredentials.Result> {
  constructor(
    private readonly httpClient: HttpClient<LoadCredentials.ResponseDTO>
  ) {}

  async exec(params: LoadCredentials.Params): LoadCredentials.Result {
    const response = await this.httpClient.request({
      url: '/credentials',
      method: HttpMethodType.get,
      params: {
        page: (params.page || 1).toString(),
        search: params.search ?? ''
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
    const credentials = Array.from(payload.data, item =>
      Credential.create({
        id: item.id,
        name: item.name,
        username: item.username,
        description: item.description,
        password: item.password,
        createdAt: item.created_at
      })
    )

    const pagination = Paginator.create({
      pagination: {
        total: payload.meta.total,
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        perPage: payload.meta.per_page
      },
      data: credentials
    })

    return Either.right(pagination)
  }
}
