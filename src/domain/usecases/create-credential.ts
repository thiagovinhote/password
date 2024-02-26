import { Either } from "~/common/either";

import { Credential } from "../models/credential";

export namespace CreateCredential {
  export type Params = {
    name: string;
    username: string;
    password: string;
    description?: string;
    folderId?: string;
  };

  export type Result = Promise<Either<Error, Credential>>;

  export type ResponseDTO = {
    id: string;
    name: string;
    username: string;
    password: string;
    created_at: string;
    description?: string;
  };
}
