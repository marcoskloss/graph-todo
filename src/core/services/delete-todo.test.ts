import { makeFakeTodoRepository } from '../../test/fakes/fake-todo-repository';
import { DeleteTodo } from './delete-todo';

describe('DeleteTodo service', () => {
  it('should delete a todo of the given id', async () => {
    const fakeRepository = makeFakeTodoRepository();

    const deleteTodo = new DeleteTodo(fakeRepository);
    const todoId = 'fake-todo-id';
    await deleteTodo.exec({ id: todoId });

    expect(fakeRepository.delete).toHaveBeenCalledWith(todoId);
  });
});
