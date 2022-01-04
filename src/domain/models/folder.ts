export class Folder {
  public id: string;
  public name: string;
  public createdAt: Date;

  private constructor() { }

  static create(params: Folder.Params) {
    const instance = new Folder()
    instance.id = params.id;
    instance.name = params.name;
    instance.createdAt = typeof params.createdAt === 'string' ? new Date(params.createdAt) : params.createdAt

    return instance
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
    }
  }

  static serializeArray(array: Folder[]) {
    return array.map(folder => folder.serialize()) as unknown as Folder[]
  }
}

export namespace Folder {
  export type DTO = ReturnType<Folder['serialize']>
  export type Params = { id: string, name: string, createdAt: string | Date }
}
