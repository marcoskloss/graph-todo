import { Todo } from '../entities/todo';

describe('Todo entity', () => {
  it('should create a Todo and fill out its values', () => {
    const content = 'foo';
    const todo = new Todo({ content });
    const values = todo.getValues();
    expect(values).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(Date),
        done: false,
        content,
      })
    );
  });

  it('should validate content length', () => {
    const invalidContent = '';
    const validContent = 'foo';
    expect(() => new Todo({ content: invalidContent })).toThrow();
    expect(() => new Todo({ content: validContent })).not.toThrow();
  });

  it('should mark a todo as done', () => {
    const todo = new Todo({ content: 'foo' });
    expect(todo.getValues().done).toBe(false);

    todo.markAsDone();

    expect(todo.getValues().done).toBe(true);
  });

  it('should mark a todo as undone', () => {
    const todo = new Todo({ content: 'foo' });
    todo.markAsDone();
    expect(todo.getValues().done).toBe(true);
    todo.markAsUndone();
    expect(todo.getValues().done).toBe(false);
  });
});
