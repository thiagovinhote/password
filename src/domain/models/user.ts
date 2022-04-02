export class User {
  public id: string
  public name: string
  public email: string
  public pictureUrl: URL | null

  private constructor() {}

  static create(params: UserTypes.Params) {
    const instance = new User()
    instance.id = params.id
    instance.name = params.name
    instance.email = params.email
    instance.pictureUrl = params.pictureUrl ? new URL(params.pictureUrl) : null

    return instance
  }
}

export namespace UserTypes {
  export type Params = {
    id: string
    name: string
    email: string
    pictureUrl?: string
  }
}
