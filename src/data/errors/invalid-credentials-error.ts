export class InvalidCredentialsError extends Error {
  private constructor() {
    super('Credenciais inválidas')
    this.name = 'InvalidCredentialsError'
  }

  static create(): InvalidCredentialsError {
    return new InvalidCredentialsError()
  }
}
