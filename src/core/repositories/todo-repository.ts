import { Todo } from '../entities/todo';

export interface ITodoRepository {
  create(todo: Todo): Promise<void>;
}
