import { useCallback } from 'react';
import { Todo } from '../../models';
import { Optional, WithId } from '../../types';

type NewTodo = Pick<Todo, 'content' | 'done'>;

const useTodo = () => {
  const getTodo = useCallback((todoId?: string): Optional<WithId<Todo>> => {
    if (!todoId) {
      return Optional.empty() as Optional<WithId<Todo>>;
    }
    const todo: WithId<Todo> = {
      id: todoId,
      content: 'the quick brown fox jumps over the lazy dog',
      createdAt: new Date(),
      done: true,
    };
    return Optional.of(todo);
  }, []);

  const saveTodo = useCallback((todo: WithId<Todo> | NewTodo) => {}, []);

  return { getTodo, saveTodo };
};

export default useTodo;
