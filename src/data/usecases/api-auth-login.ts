import { Either } from '~/common/either'
import { User } from '~/domain/models/user'
import { AuthLogin } from '~/domain/usecases/auth-login'
import { Usecase } from '~/domain/usecases/usecase'
import {
  AccessDeniedError,
  InvalidCredentialsError,
  InvalidResourceError,
  UnexpectedError
} from '../errors'
import {
  HttpClient,
  HttpMethodType,
  HttpStatusCode
} from '../protocols/http/http-client'

export class ApiAuthLogin
  implements Usecase<AuthLogin.Params, AuthLogin.Result> {
  constructor(private readonly httpClient: HttpClient<AuthLogin.ResponseDTO>) {}

  async exec(params: AuthLogin.Params): AuthLogin.Result {
    const response = await this.httpClient.request({
      url: '/auth/login',
      method: HttpMethodType.post,
      body: {
        email: params.email,
        password: params.password
      }
    })

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        return Either.left(AccessDeniedError.create())
      case HttpStatusCode.unauthorized:
        return Either.left(InvalidCredentialsError.create())
      case HttpStatusCode.notFound:
        return Either.left(InvalidResourceError.create())
      case HttpStatusCode.serverError:
        return Either.left(UnexpectedError.create())
    }

    const payload = response.body
    const user = User.create({
      id: payload.user.id,
      email: payload.user.email,
      name: payload.user.name,
      pictureUrl: payload.user.picture_url
    })
    const token = payload.token

    return Either.right({ user, token })
  }
}
