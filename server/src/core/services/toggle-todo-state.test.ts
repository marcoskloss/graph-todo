import { ToggleTodoState } from './toggle-todo-state';
import { Todo } from '../entities/todo';
import { makeFakeTodoRepository } from '../../test/fakes/fake-todo-repository';

describe('ToggleTodoState service', () => {
  it('should mark the Todo as done', async () => {
    const todo = new Todo({ content: 'foo' });
    expect(todo.getValues().done).toBe(false);

    const fakeRepository = makeFakeTodoRepository({
      findById: jest.fn().mockImplementationOnce(() => Promise.resolve(todo)),
    });
    const toggleTodoState = new ToggleTodoState(fakeRepository);

    const { todo: updatedTodo } = await toggleTodoState.exec({
      id: todo.getValues().id,
      done: true,
    });

    expect(updatedTodo.getValues().done).toBe(true);
  });

  it('should mark the Todo as undone', async () => {
    const todo = new Todo({ content: 'foo' });
    todo.markAsDone();
    expect(todo.getValues().done).toBe(true);

    const fakeRepository = makeFakeTodoRepository({
      findById: jest.fn().mockImplementationOnce(() => Promise.resolve(todo)),
    });
    const toggleTodoState = new ToggleTodoState(fakeRepository);

    const { todo: updatedTodo } = await toggleTodoState.exec({
      id: todo.getValues().id,
      done: false,
    });

    expect(updatedTodo.getValues().done).toBe(false);
  });

  it('should throw error when the Todo of the given id is not found', async () => {
    const unexistentTodoId = 'foo-1232131-asdasd';

    const fakeRepository = makeFakeTodoRepository({
      findById: jest.fn().mockImplementationOnce(() => Promise.resolve(null)),
    });
    const toggleTodoState = new ToggleTodoState(fakeRepository);

    await expect(
      toggleTodoState.exec({ id: unexistentTodoId, done: false })
    ).rejects.toThrow(Error);
  });
});
