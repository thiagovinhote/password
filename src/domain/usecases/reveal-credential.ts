import { Either } from '~/common/either'
import { Password } from '../models/password'

export namespace RevealCredential {
  export type Params = {
    id: string
  }

  export type Result = Promise<Either<Error, Password>>

  export type ResponseDTO = {
    decrypted: string
  }
}
