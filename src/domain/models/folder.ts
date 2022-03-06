import { Timestamp } from '../fields/timestamp'

export class Folder {
  public id: string
  public name: string
  public createdAt: Date

  private constructor() {}

  static create(params: FolderTypes.Params) {
    const instance = new Folder()
    instance.id = params.id
    instance.name = params.name
    instance.createdAt = Timestamp.create(params.createdAt)

    return instance
  }
}

export namespace FolderTypes {
  export type Params = { id: string; name: string; createdAt: string | Date }
}
