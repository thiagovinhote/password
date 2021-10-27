export class User {
  public id: string;
  public name: string;
  public email: string;

  private constructor(){}

  static create(params: { id: string, name: string, email: string }) {
    const instance = new User()
    instance.id = params.id;
    instance.name = params.name;
    instance.email = params.email;

    return instance
  }
}
