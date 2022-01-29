import { Either } from '~/common/either'
import { Tag } from '../models/tag'

export namespace CreateTag {
  export type Params = {
    label: string
    color?: string
  }

  export type Result = Promise<Either<Error, Tag>>

  export type ResponseDTO = {
    id: string
    label: string
    color?: string
    created_at: string
  }
}
