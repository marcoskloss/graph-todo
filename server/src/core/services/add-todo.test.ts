import { AddTodo } from './add-todo';
import { makeFakeTodoRepository } from '../../test/fakes/fake-todo-repository';

describe('AddTodo service', () => {
  it('should create a new todo', async () => {
    const fakeRepository = makeFakeTodoRepository();

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
