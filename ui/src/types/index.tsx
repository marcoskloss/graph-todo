/* eslint-disable @typescript-eslint/lines-between-class-members */
export type WithId<T> = T & { id: string };

type OptionalType = 'some' | 'none';

export class Optional<T> {
  private type: OptionalType;
  private value: T;

  private constructor(type: OptionalType, value: T) {
    this.type = type;
    this.value = value;
  }

  public static of<T>(value: T): Optional<T> {
    const type: OptionalType =
      value === null || value === undefined ? 'none' : 'some';
    return new Optional(type, value);
  }

  public static empty<T>(): Optional<T | null> {
    return new Optional('none', null);
  }

  public unwrap(): T {
    if (this.type === 'some') {
      return this.value;
    }
    throw new Error("Can't unwrap value because it is not present");
  }

  public unwrapOr(fallback: T): T {
    return this.type === 'some' ? this.value : fallback;
  }

  public unwrapExpect(msg: string): T {
    if (this.type === 'some') {
      return this.value;
    }
    throw new Error(msg);
  }

  public isPresent(): boolean {
    return this.type === 'some';
  }
}
