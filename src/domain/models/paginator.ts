interface Serializable {
  serialize: () => any
}

export class Paginator<T extends Serializable> {
  public pagination: PaginatorTypes.Pagination
  public data: T[]

  private constructor() {}

  static create<T extends Serializable>(params: PaginatorTypes.Params<T>) {
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

  serialize() {
    return {
      pagination: this.pagination,
      data: this.data.map(item => item.serialize())
    } as Paginator<T>
  }
}

export namespace PaginatorTypes {
  export type DTO<T extends Serializable> = ReturnType<
    Paginator<T>['serialize']
  >
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
