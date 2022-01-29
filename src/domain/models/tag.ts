export class Tag {
  public id: string
  public label: string
  public color?: string
  public createdAt: Date

  private constructor() {}

  static create(params: TagTypes.Params) {
    const instance = new Tag()
    instance.id = params.id
    instance.label = params.label
    instance.color = params.color
    instance.createdAt =
      typeof params.createdAt === 'string'
        ? new Date(params.createdAt)
        : params.createdAt

    return instance
  }

  serialize() {
    return {
      id: this.id,
      label: this.label,
      color: this.color,
      createdAt: this.createdAt.toISOString()
    }
  }

  static serializeArray(array: Tag[]) {
    return (array.map(Tag => Tag.serialize()) as unknown) as Tag[]
  }
}

export namespace TagTypes {
  export type DTO = ReturnType<Tag['serialize']>
  export type Params = {
    id: string
    label: string
    color?: string
    createdAt: string | Date
  }
}
