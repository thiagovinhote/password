import { Either } from "~/common/either";

import { Folder } from "../models/folder";

export namespace LoadFolders {
  export type Result = Promise<Either<Error, Folder[]>>;

  export type ResponseDTO = Array<{
    id: string;
    name: string;
    created_at: string;
  }>;
}
