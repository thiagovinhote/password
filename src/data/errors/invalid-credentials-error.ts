export class InvalidCredentialsError extends Error {
  private constructor() {
    super('Credenciais inválidas');
    this.name = 'InvalidCredentialsError';
  }

  static create() {
    return new InvalidCredentialsError()
  }
}
