import { Todo } from '../models';
import { Optional, WithId } from '../types';

export function getTodo(todoId?: string): Optional<WithId<Todo>> {
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
}

export function saveTodo(data: any) {}
