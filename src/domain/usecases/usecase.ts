export interface Usecase<R, S> {
  exec(params: R): S
}
