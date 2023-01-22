export interface Service<P, R> {
  exec(params: P): Promise<R>;
}

