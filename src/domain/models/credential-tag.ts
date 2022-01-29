export class CredentialTag {
  public id: string
  public credentialId: string
  public tagId: string
  public createdAt: Date
  public updatedAt: Date | null

  private constructor() {}

  static create(params: CredentialTagTypes.Params) {
    const instance = new CredentialTag()
    instance.id = params.id
    instance.credentialId = params.credentialId
    instance.tagId = params.tagId
    instance.createdAt =
      typeof params.createdAt === 'string'
        ? new Date(params.createdAt)
        : params.createdAt
    instance.updatedAt =
      typeof params.updatedAt === 'string'
        ? new Date(params.updatedAt)
        : params.updatedAt

    return instance
  }

  serialize() {
    return {
      id: this.id,
      credentialId: this.credentialId,
      tagId: this.tagId,
      createdAt: this.createdAt.toISOString()
    }
  }
}

export namespace CredentialTagTypes {
  export type DTO = ReturnType<CredentialTag['serialize']>
  export type Params = {
    id: string
    credentialId: string
    tagId: string
    createdAt: string | Date
    updatedAt?: string | Date
  }
}
