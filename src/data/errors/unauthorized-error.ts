export class UnauthorizedError extends Error {
  private constructor() {
    super("Não autorizado!");
    this.name = "UnauthorizedError";
  }

  static create(): UnauthorizedError {
    return new UnauthorizedError();
  }
}
