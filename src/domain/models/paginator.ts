export class Paginator<T> {
  public pagination: PaginatorTypes.Pagination
  public data: T[]

  protected constructor() {}

  static create<T>(params: PaginatorTypes.Params<T>) {
    const instance = new Paginator<T>()
    instance.pagination = {
      total: params.pagination.total,
      currentPage: params.pagination.currentPage,
      lastPage: params.pagination.lastPage,
      perPage: params.pagination.perPage
    }
    instance.data = params.data

    return instance
  }
}

export namespace PaginatorTypes {
  export type Params<T> = {
    pagination: Pagination
    data: T[]
  }

  export type Pagination = {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
  }
}
