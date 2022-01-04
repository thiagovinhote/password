import { Folder } from "./folder";

export class Credential {
  public id: string;
  public name: string;
  public username: string;
  public description: string | null;
  public password: string | null;
  public createdAt: Date;
  public updatedAt: Date | null;
  public folders?: Folder[]

  private constructor() { }

  static create(params: Credential.Params) {
    const instance = new Credential()
    instance.id = params.id;
    instance.name = params.name;
    instance.username = params.username;
    instance.description = params.description;
    instance.password = params.password;
    instance.createdAt = typeof params.createdAt === 'string' ? new Date(params.createdAt) : params.createdAt
    instance.updatedAt = typeof params.updatedAt === 'string' ? new Date(params.updatedAt) : params.updatedAt
    instance.folders = params.folders?.map(Folder.create);

    return instance
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      password: this.password ?? null,
      description: this.description ?? null,
      createdAt: this.createdAt.toISOString(),
      folders: this.folders?.map(folder => folder.serialize()) ?? null
    }
  }

  static serializeArray(array: Credential[]) {
    return array.map(credential => credential.serialize()) as unknown as Credential[]
  }
}

export namespace Credential {
  export type DTO = ReturnType<Credential['serialize']>
  export type Params = {
    id: string,
    name: string,
    username: string,
    description?: string,
    password?: string,
    createdAt: string | Date,
    updatedAt?: string | Date,
    folders?: Folder.Params[]
  }
}
