import { ITodoRepository } from '../../core/repositories/todo-repository';

export function makeFakeTodoRepository(methods: Partial<ITodoRepository> = {}): ITodoRepository {
  return {
    create: jest.fn(),
    delete: jest.fn(),
    ...methods,
  }
}
