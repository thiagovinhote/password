export class UnprocessableEntityError extends Error {
  constructor() {
    super('A entidade não pôde ser processada')
    this.name = 'UnprocessableEntityError'
  }

  static create(): UnprocessableEntityError {
    return new UnprocessableEntityError()
  }
}
