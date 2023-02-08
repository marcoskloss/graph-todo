import { ITodoRepository } from '../repositories/todo-repository';
import { Service } from './service';

interface Params {
  id: string;
}

export class DeleteTodo implements Service<Params, void> {
  constructor(private todoRepository: ITodoRepository) {}

  public async exec({ id }: Params): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
