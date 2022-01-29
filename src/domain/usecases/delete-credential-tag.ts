import { Either } from '~/common/either'

export namespace DeleteCredentialTag {
  export type Params = {
    credentialId: string
    tagId: string
  }

  export type Result = Promise<Either<Error, undefined>>

  export type ResponseDTO = undefined
}
