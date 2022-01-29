import { Either } from '~/common/either'
import { CredentialTag } from '~/domain/models/credential-tag'
import { CreateCredentialTag } from '~/domain/usecases/create-credential-tag'
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

export class ApiCreateCredentialTag
  implements Usecase<CreateCredentialTag.Params, CreateCredentialTag.Result> {
  constructor(
    private readonly httpClient: HttpClient<CreateCredentialTag.ResponseDTO>
  ) {}

  async exec(params: CreateCredentialTag.Params): CreateCredentialTag.Result {
    const response = await this.httpClient.request({
      url: `/credentials/${params.credentialId}/tags`,
      method: HttpMethodType.post,
      body: {
        tag_id: params.tagId
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
    const credential = CredentialTag.create({
      id: payload.id,
      credentialId: payload.credential_id,
      tagId: payload.tag_id,
      createdAt: payload.created_at
    })

    return Either.right(credential)
  }
}
