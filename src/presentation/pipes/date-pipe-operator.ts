import { PipeOperator } from '../protocols/pipes'
import dateFormat from 'date-fns/format'
import dateParseIso from 'date-fns/parseISO'
import dateIsDate from 'date-fns/isDate'
import ptBRLocale from 'date-fns/locale/pt-BR'

type InputType = {
  value: string | Date
  pattern: string
}

export class DatePipeOperator implements PipeOperator<InputType, string> {
  private readonly defaultOptions: any

  private constructor() {
    this.defaultOptions = {
      locale: ptBRLocale
    }
    this.exec = this.exec.bind(this)
  }

  static factory(): DatePipeOperator {
    return new DatePipeOperator()
  }

  exec(input: InputType): string {
    const value = dateIsDate(input)
      ? (input.value as Date)
      : dateParseIso(input.value as string)

    return dateFormat(value, input.pattern, this.defaultOptions)
  }
}
