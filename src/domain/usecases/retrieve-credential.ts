import { Either } from "~/common/either";

import { Credential } from "../models/credential";

export namespace RetrieveCredential {
  export type Params = {
    id: string;
  };

  export type Result = Promise<Either<Error, Credential>>;

  export type ResponseDTO = {
    id: string;
    name: string;
    username: string;
    description: string;
    created_at: string;
    updated_at: string;
    folders: {
      id: string;
      name: string;
      created_at: string;
    }[];
    tags: {
      id: string;
      label: string;
      color?: string;
      created_at: string;
    }[];
  };
}
