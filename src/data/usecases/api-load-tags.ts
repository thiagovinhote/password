import { Either } from "~/common/either";
import { Paginator } from "~/domain/models/paginator";
import { Tag } from "~/domain/models/tag";
import { LoadTags } from "~/domain/usecases/load-tags";
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

export class ApiLoadTags implements Usecase<LoadTags.Params, LoadTags.Result> {
  constructor(private readonly httpClient: HttpClient<LoadTags.ResponseDTO>) {}

  async exec(params: LoadTags.Params): LoadTags.Result {
    const response = await this.httpClient.request({
      url: "/tags",
      method: HttpMethodType.get,
      params: {
        page: (params.page || 1).toString(),
        limit: (params.limit || 10).toString(),
        search: params.search ?? "",
      },
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
    const Tags = Array.from(payload.data, (item) =>
      Tag.create({
        id: item.id,
        label: item.label,
        color: item.color,
        createdAt: item.created_at,
      }),
    );

    const pagination = Paginator.create({
      pagination: {
        total: payload.meta.total,
        currentPage: payload.meta.current_page,
        lastPage: payload.meta.last_page,
        perPage: payload.meta.per_page,
      },
      data: Tags,
    });

    return Either.right(pagination);
  }
}
