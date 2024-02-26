import { Either } from "~/common/either";

export namespace DeleteCredential {
  export type Params = {
    id: string;
  };

  export type Result = Promise<Either<Error, undefined>>;

  export type ResponseDTO = undefined;
}
