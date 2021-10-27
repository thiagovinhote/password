export class InvalidResourceError extends Error {
  private constructor() {
    super('Recurso não encontrado.');
    this.name = 'InvalidResourceError';
  }

  static create() {
    return new InvalidResourceError()
  }
}
