import { ValueValidation } from '../protocols/validation'

export class EmailValueValidation implements ValueValidation {
  static EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

  private constructor() {}

  static factory(): EmailValueValidation {
    return new EmailValueValidation()
  }

  exec(input: string): Error {
    return !input || EmailValueValidation.EMAIL_REGEX.test(input)
      ? null
      : new Error('E-mail inválido')
  }
}
