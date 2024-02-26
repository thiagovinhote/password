import { Either } from "~/common/either";
import { Tag } from "~/domain/models/tag";
import { CreateTag } from "~/domain/usecases/create-tag";
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

export class ApiCreateTag
  implements Usecase<CreateTag.Params, CreateTag.Result>
{
  constructor(private readonly httpClient: HttpClient<CreateTag.ResponseDTO>) {}

  async exec(params: CreateTag.Params): CreateTag.Result {
    const response = await this.httpClient.request({
      url: "/tags",
      method: HttpMethodType.post,
      body: { label: params.label, color: params.color },
    });

    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        return Either.left(AccessDeniedError.create());
      case HttpStatusCode.notFound:
        return Either.left(InvalidResourceError.create());
      case HttpStatusCode.serverError:
        return Either.left(UnexpectedError.create());
    }

    const payload = response.body;
    const tag = Tag.create({
      id: payload.id,
      label: payload.label,
      color: payload.color,
      createdAt: payload.created_at,
    });

    return Either.right(tag);
  }
}
