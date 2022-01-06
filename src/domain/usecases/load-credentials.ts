import { Either } from '~/common/either'
import { Credential } from '../models/credential'
import { Paginator } from '../models/paginator'

export namespace LoadCredentials {
  export type Params = {
    page?: number
  }

  export type Result = Promise<Either<Error, Paginator<Credential>>>

  export type ResponseDTO = {
    meta: {
      total: number
      per_page: number
      current_page: number
      last_page: number
    }

    data: Array<{
      id: string
      name: string
      username: string
      description: string
      password: string
      created_at: string
    }>
  }
}
