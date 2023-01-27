import { Todo } from '../entities/todo';

export interface ITodoRepository {
  create(todo: Todo): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Todo>;
  save(todo: Todo): Promise<void>;
}
