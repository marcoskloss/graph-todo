import { AddTodo } from './add-todo';
import { ITodoRepository } from '../repositories/todo-repository';

describe('AddTodo service', () => {
  it('should create a new todo', async () => {
    const fakeRepository: ITodoRepository = {
      create: jest.fn(),
    };

    const addTodo = new AddTodo(fakeRepository);

    const content = 'foo';
    const { todo } = await addTodo.exec({ content });

    expect(todo.getValues()).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(Date),
        done: false,
        content,
      })
    );
  });
});
