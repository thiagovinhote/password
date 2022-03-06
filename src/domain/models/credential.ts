import { Timestamp } from '../fields/timestamp'
import { Folder, FolderTypes } from './folder'
import { Tag, TagTypes } from './tag'

export class Credential {
  public id: string
  public name: string
  public username: string
  public description: string | null
  public password: string | null
  public createdAt: Timestamp
  public updatedAt: Timestamp | null
  public folders?: Folder[]
  public tags?: Tag[]

  private constructor() {}

  static create(params: CredentialTypes.Params) {
    const instance = new Credential()
    instance.id = params.id
    instance.name = params.name
    instance.username = params.username
    instance.description = params.description
    instance.password = params.password
    instance.createdAt = Timestamp.create(params.createdAt)
    instance.updatedAt = Timestamp.create(params.updatedAt)
    instance.folders = params.folders?.map(Folder.create)
    instance.tags = params.tags?.map(Tag.create)

    return instance
  }
}

export namespace CredentialTypes {
  export type Params = {
    id: string
    name: string
    username: string
    description?: string
    password?: string
    createdAt: string | Date
    updatedAt?: string | Date
    folders?: FolderTypes.Params[]
    tags?: TagTypes.Params[]
  }
}
