import { Either } from "~/common/either"
import { Folder } from "../models/folder"

export namespace CreateFolder {
  export type Params = {
    name: string;
  }

  export type Result = Promise<Either<Error, Folder>>

  export type ResponseDTO = {
    id: string
    name: string
    created_at: string
  }
}
