import { User } from '../models/user'
import { Either } from '~/common/either'

export namespace AuthLogin {
  export type Params = {
    email: string
    password: string
  }

  export type Model = {
    user: User
    token: string
  }

  export type Result = Promise<Either<Error, Model>>

  export type ResponseDTO = {
    user: {
      id: string
      name: string
      email: string
      picture_url: string
    }
    token: string
  }
}
