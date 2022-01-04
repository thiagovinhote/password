export class Password {
  public decrypted: string

  private constructor() {}

  static create(params: PasswordTypes.Params) {
    const instance = new Password()
    instance.decrypted = params.decrypted

    return instance
  }

  serialize() {
    return {
      decrypted: this.decrypted
    }
  }
}

export namespace PasswordTypes {
  export type DTO = ReturnType<Password['serialize']>
  export type Params = { decrypted: string }
}
