import { Either } from "~/common/either";

import { Credential } from "../models/credential";

export namespace UpdateCredential {
  export type Params = {
    id: string;
    payload: {
      name?: string;
      username?: string;
      password?: string;
      description?: string;
    };
  };

  export type Result = Promise<Either<Error, Credential>>;

  export type ResponseDTO = {
    id: string;
    name: string;
    username: string;
    description?: string;
    created_at: string;
  };
}
