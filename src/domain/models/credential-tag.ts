import { Timestamp } from '../fields/timestamp'

export class CredentialTag {
  public id: string
  public credentialId: string
  public tagId: string
  public createdAt: Timestamp
  public updatedAt: Timestamp | null

  private constructor() {}

  static create(params: CredentialTagTypes.Params) {
    const instance = new CredentialTag()
    instance.id = params.id
    instance.credentialId = params.credentialId
    instance.tagId = params.tagId
    instance.createdAt = Timestamp.create(params.createdAt)
    instance.updatedAt = Timestamp.create(params.updatedAt)

    return instance
  }
}

export namespace CredentialTagTypes {
  export type Params = {
    id: string
    credentialId: string
    tagId: string
    createdAt: string | Date
    updatedAt?: string | Date
  }
}
