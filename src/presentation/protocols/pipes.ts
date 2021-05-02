export interface PipeOperator<R, S> {
  exec(input: R): S
}
