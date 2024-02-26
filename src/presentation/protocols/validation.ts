export interface ValueValidation<R = string> {
  exec(input: R): Error | null;
}
