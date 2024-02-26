import { Either } from "~/common/either";

import { User } from "../models/user";

export namespace AuthMe {
  export type Result = Promise<Either<Error, User>>;

  export type ResponseDTO = {
    id: string;
    name: string;
    email: string;
    picture_url: string;
  };
}
