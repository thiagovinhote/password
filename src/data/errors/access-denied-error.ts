export class AccessDeniedError extends Error {
  private constructor() {
    super("Acesso negado!");
    this.name = "AccessDeniedError";
  }

  static create(): AccessDeniedError {
    return new AccessDeniedError();
  }
}
