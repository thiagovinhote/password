export class Timestamp extends Date {
  static create(value?: string | Date): Timestamp | null {
    if (value instanceof Date) {
      return new Timestamp(value);
    } else if (!value?.trim()) {
      return null;
    } else {
      return new Timestamp(value);
    }
  }
}
