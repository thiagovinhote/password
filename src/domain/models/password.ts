export class Password {
  public decrypted: string;

  private constructor() { }

  static create(params: { decrypted: string }) {
    const instance = new Password()
    instance.decrypted = params.decrypted;

    return instance
  }

  serialize() {
    return {
      decrypted: this.decrypted
    }
  }
}

export namespace Password {
  export type DTO = ReturnType<Password['serialize']>
}
