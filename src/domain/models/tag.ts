import { Timestamp } from "../fields/timestamp";

export class Tag {
  public id: string;
  public label: string;
  public color?: string;
  public createdAt: Timestamp | null;

  private constructor() {}

  static create(params: TagTypes.Params) {
    const instance = new Tag();
    instance.id = params.id;
    instance.label = params.label;
    instance.color = params.color;
    instance.createdAt = Timestamp.create(params.createdAt);

    return instance;
  }
}

export namespace TagTypes {
  export type Params = {
    id: string;
    label: string;
    color?: string;
    createdAt: string | Date;
  };
}
