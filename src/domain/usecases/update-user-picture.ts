import { Either } from '~/common/either'

export namespace UpdateUserPicture {
  export type Params = {
    id: string
    picture: File
  }

  export type Result = Promise<Either<Error, void>>

  export type ResponseDTO = undefined
}
