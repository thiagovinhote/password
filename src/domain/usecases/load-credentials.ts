import { Either } from "~/common/either"
import { Credential } from "../models/credential"

export namespace LoadCredentials {
  export type Result = Promise<Either<Error, Credential[]>>

  export type ResponseDTO = Array<{
    id: string
    name: string
    username: string
    description: string;
    password: string
    created_at: string
  }>
}
