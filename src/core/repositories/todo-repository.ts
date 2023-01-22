import { Todo } from '../entities/todo';

export interface TodoRepository {
  create(todo: Todo): Promise<void>;
}
