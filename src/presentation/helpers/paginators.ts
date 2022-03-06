import { Credential } from '~/domain/models/credential'
import { Paginator, PaginatorTypes } from '~/domain/models/paginator'

export class CredentialPaginator {
  static create(params: PaginatorTypes.Params<Credential>) {
    return Paginator.create({
      ...params,
      data: params.data.map(Credential.create)
    })
  }
}
