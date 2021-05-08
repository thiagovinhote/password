export namespace FetchGenerate {
  export type Params = {
    includeNumbers: boolean
    lowercaseCharacters: boolean
    uppercaseCharacters: boolean
    passwordSize: number
  }

  export type Result = Promise<string[]>

  export type ResponseDTO = {
    result: string[]
  }
}
