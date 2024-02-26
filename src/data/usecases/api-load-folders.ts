import { Either } from "~/common/either";
import { Folder } from "~/domain/models/folder";
import { LoadFolders } from "~/domain/usecases/load-folders";
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

export class ApiLoadFolders implements Usecase<never, LoadFolders.Result> {
  constructor(
    private readonly httpClient: HttpClient<LoadFolders.ResponseDTO>,
  ) {}

  async exec(): LoadFolders.Result {
    const response = await this.httpClient.request({
      url: "/folders",
      method: HttpMethodType.get,
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
    const folders = Array.from(payload, (item) =>
      Folder.create({
        id: item.id,
        name: item.name,
        createdAt: item.created_at,
      }),
    );

    return Either.right(folders);
  }
}
