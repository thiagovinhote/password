import { Either } from '~/common/either'
import { User } from '~/domain/models/user'
import { AuthMe } from '~/domain/usecases/auth-me'
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

export class ApiAuthMe implements Usecase<never, AuthMe.Result> {
  constructor(private readonly httpClient: HttpClient<AuthMe.ResponseDTO>) {}

  async exec(): AuthMe.Result {
    const response = await this.httpClient.request({
      url: '/auth/me',
      method: HttpMethodType.get
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
    const user = User.create({
      id: payload.id,
      email: payload.email,
      name: payload.name
    })

    return Either.right(user)
  }
}
