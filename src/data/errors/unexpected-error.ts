export class UnexpectedError extends Error {
  private constructor() {
    super('Algo de errado aconteceu.');
    this.name = 'UnexpectedError';
  }

  static create() {
    return new UnexpectedError()
  }
}
