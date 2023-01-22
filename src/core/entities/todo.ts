import { randomUUID } from 'crypto';

export interface ITodo {
  id: string;
  content: string;
  done: boolean;
  createdAt: Date;
}

export class Todo {
  private id: string;
  private content: string;
  private done: boolean;
  private createdAt: Date;

  constructor(values: Omit<ITodo, 'id' | 'done' | 'createdAt'>) {
    const todo: ITodo = {
      id: randomUUID(),
      done: false,
      content: values.content,
      createdAt: new Date(),
    };
    this.validate(todo);
    this.init(todo);
  }

  public markAsDone() { this.done = true; }

  public markAsUndone() { this.done = false; }

  public setValues(values: Partial<Omit<ITodo, 'id'>>) {
    if (values.content !== undefined) this.content = values.content;
    if (values.done !== undefined) this.done = values.done;
  }

  public getValues(): ITodo {
    return {
      id: this.id,
      content: this.content,
      done: this.done,
      createdAt: this.createdAt,
    };
  }

  private init(todo: ITodo) {
    this.id = todo.id;
    this.createdAt = todo.createdAt;
    this.content = todo.content;
    this.done = todo.done;
  }

  private validate(todo: ITodo) {
    // TODO add better error reporting
    if (todo.content.trim().length === 0) {
      throw new Error('Todo content must not be empty');
    }
  }
}
