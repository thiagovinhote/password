import { Either } from '~/common/either'
import { Tag } from '../models/tag'
import { Paginator } from '../models/paginator'

export namespace LoadTags {
  export type Params = {
    page?: number
    limit?: number
    search?: string
  }

  export type Result = Promise<Either<Error, Paginator<Tag>>>

  export type ResponseDTO = {
    meta: {
      total: number
      per_page: number
      current_page: number
      last_page: number
    }

    data: Array<{
      id: string
      label: string
      color?: string
      created_at: string
    }>
  }
}
