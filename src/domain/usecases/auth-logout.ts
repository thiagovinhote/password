import { Either } from '~/common/either'

export namespace AuthLogout {
  export type Params = never

  export type Model = undefined

  export type Result = Promise<Either<Error, Model>>

  export type ResponseDTO = undefined
}
