import { Credential } from "~/domain/models/credential";
import { Paginator, PaginatorTypes } from "~/domain/models/paginator";
import { Tag } from "~/domain/models/tag";

export class CredentialPaginator {
  static create(params: PaginatorTypes.Params<Credential>) {
    return Paginator.create({
      ...params,
      data: params.data.map(Credential.create),
    });
  }
}

export class TagPaginator {
  static create(params: PaginatorTypes.Params<Tag>) {
    return Paginator.create({
      ...params,
      data: params.data.map(Tag.create),
    });
  }
}
