export class Password {
  public decrypted: string

  private constructor() {}

  static create(params: PasswordTypes.Params) {
    const instance = new Password()
    instance.decrypted = params.decrypted

    return instance
  }
}

export namespace PasswordTypes {
  export type Params = { decrypted: string }
}
