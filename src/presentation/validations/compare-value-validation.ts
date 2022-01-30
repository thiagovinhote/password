import { ValueValidation } from '../protocols/validation'

type Input = {
  left: string
  right: string
}

export class CompareValueValidation implements ValueValidation<Input> {
  private constructor() {}

  static factory(): CompareValueValidation {
    return new CompareValueValidation()
  }

  exec(input: Input): Error {
    if (!input.left && !input.right) {
      return null
    }

    if (input.left === input.right) {
      return null
    }

    return new Error('Valores devem ser iguais')
  }
}
