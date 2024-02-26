import { Either } from "~/common/either";
import { UpdateUserPicture } from "~/domain/usecases/update-user-picture";
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

export class ApiUpdateUserPicture
  implements Usecase<UpdateUserPicture.Params, UpdateUserPicture.Result>
{
  constructor(
    private readonly httpClient: HttpClient<UpdateUserPicture.ResponseDTO>,
  ) {}

  async exec(params: UpdateUserPicture.Params): UpdateUserPicture.Result {
    const file = params.picture;
    const content = new FormData();
    content.append("picture", file);

    const response = await this.httpClient.request({
      url: `/users/${params.id}/picture`,
      method: HttpMethodType.post,
      body: content,
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
