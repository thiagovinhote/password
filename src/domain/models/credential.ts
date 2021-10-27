export class Credential {
  public id: string;
  public name: string;
  public username: string;
  public description: string | null;
  public password: string | null;
  public createdAt: Date;

  private constructor() { }

  static create(params: { id: string, name: string, username: string, description?: string, password?: string, createdAt: string | Date }) {
    const instance = new Credential()
    instance.id = params.id;
    instance.name = params.name;
    instance.username = params.username;
    instance.description = params.description ?? null;
    instance.password = params.password ?? null;
    instance.createdAt = typeof params.createdAt === 'string' ? new Date(params.createdAt) : params.createdAt

    return instance
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      password: this.password,
      description: this.description,
      createdAt: this.createdAt.toISOString(),
    }
  }

  static serializeArray(array: Credential[]) {
    return array.map(credential => credential.serialize()) as unknown as Credential[]
  }
}
