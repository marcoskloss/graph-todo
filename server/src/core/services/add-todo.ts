import { ITodoRepository } from '../repositories/todo-repository';
import { Service } from './service';
import { Todo } from '../entities/todo';

interface Params {
  content: string;
}
interface Response {
  todo: Todo;
}

export class AddTodo implements Service<Params, Response> {
  constructor(private todoRepository: ITodoRepository) {}

  public async exec({ content }: Params): Promise<Response> {
    const todo = new Todo({ content });
    await this.todoRepository.create(todo);
    return { todo };
  }
}
