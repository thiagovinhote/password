export class QueryStringParser {
  static array<T = null>(
    value: undefined | string | string[],
    defaultValue: T = null
  ): string[] | T {
    if (!value) {
      return defaultValue
    }

    return Array.isArray(value) ? value : [value]
  }
}
