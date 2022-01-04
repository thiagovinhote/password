export class User {
  public id: string
  public name: string
  public email: string

  private constructor() {}

  static create(params: UserTypes.Params) {
    const instance = new User()
    instance.id = params.id
    instance.name = params.name
    instance.email = params.email

    return instance
  }
}

export namespace UserTypes {
  export type Params = { id: string; name: string; email: string }
}
