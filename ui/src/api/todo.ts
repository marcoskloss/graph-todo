import { Todo } from '../models';
import { Optional, WithId } from '../types';

export function getTodo(todoId: string): Optional<WithId<Todo>> {
  const todo: WithId<Todo> = {
    id: todoId,
    content: 'the quick brown fox jumps over the lazy dog',
    createdAt: new Date(),
    done: true,
  };
  return Optional.of(todo);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function saveTodo(data: any) {}
