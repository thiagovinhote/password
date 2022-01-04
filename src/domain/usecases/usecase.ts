export interface Usecase<R, S> {
  exec(params: R | never): S
}
