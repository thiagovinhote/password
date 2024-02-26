import { Either } from "~/common/either";

import { CredentialTag } from "../models/credential-tag";

export namespace CreateCredentialTag {
  export type Params = {
    credentialId: string;
    tagId: string;
  };

  export type Result = Promise<Either<Error, CredentialTag>>;

  export type ResponseDTO = {
    id: string;
    credential_id: string;
    tag_id: string;
    created_at: string;
  };
}
