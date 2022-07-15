import { Either } from '~/common/either'

export namespace FetchGenerate {
  export type Params = {
    includeNumbers: boolean
    includeSymbols: boolean
    lowercaseCharacters: boolean
    uppercaseCharacters: boolean
    noAmbiguousCharacters: boolean
    passwordSize: number
  }

  export type Result = Promise<Either<Error, string[]>>

  export type ResponseDTO = string[]
}
