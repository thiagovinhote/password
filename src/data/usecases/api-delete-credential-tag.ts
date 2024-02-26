import { Either } from "~/common/either";
import { DeleteCredentialTag } from "~/domain/usecases/delete-credential-tag";
import { Usecase } from "~/domain/usecases/usecase";

import {
  AccessDeniedError,
  InvalidResourceError,
  UnexpectedError,
} from "../errors";
import {
  HttpClient,
  HttpMethodType,
  HttpStatusCode,
} from "../protocols/http/http-client";

export class ApiDeleteCredentialTag
  implements Usecase<DeleteCredentialTag.Params, DeleteCredentialTag.Result>
{
  constructor(
    private readonly httpClient: HttpClient<DeleteCredentialTag.ResponseDTO>,
  ) {}

  async exec(params: DeleteCredentialTag.Params): DeleteCredentialTag.Result {
    const response = await this.httpClient.request({
      url: `/credentials/${params.credentialId}/tags/${params.tagId}`,
      method: HttpMethodType.delete,
    });

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        return Either.left(AccessDeniedError.create());
      case HttpStatusCode.notFound:
        return Either.left(InvalidResourceError.create());
      case HttpStatusCode.serverError:
        return Either.left(UnexpectedError.create());
    }

    return Either.right(undefined);
  }
}
