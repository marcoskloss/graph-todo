import { Todo } from '../entities/todo';
import { ITodoRepository } from '../repositories/todo-repository';
import { Service } from './service';

interface Params {
  id: string;
  done: boolean;
}
interface Response {
  todo: Todo;
}

export class ToggleTodoState implements Service<Params, Response> {
  constructor(private todoRepository: ITodoRepository) {}

  public async exec({ id, done }: Params): Promise<Response> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new Error('Todo not found');
    }

    done ? todo.markAsDone() : todo.markAsUndone();
    await this.todoRepository.save(todo);
    return { todo };
  }
}
