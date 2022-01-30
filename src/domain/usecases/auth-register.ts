import { User } from '../models/user'
import { Either } from '~/common/either'

export namespace AuthRegister {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = Promise<Either<Error, User>>

  export type ResponseDTO = {
    id: string
    name: string
    email: string
  }
}
