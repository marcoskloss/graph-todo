import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Todo } from '../../../models';
import type { WithId } from '../../../types';
import { Optional } from '../../../types';
import TodoForm, { TodoFormValues } from './form';

// TODO this component should be a modal

type Params = {
  todoId: string;
};

const emptyFormState = { content: '', done: false };

const validator = ({ content }: { content: string }) =>
  (content ?? '').trim().length > 0;

function TodoDetails() {
  const params = useParams<Params>();
  const [formInitialState, setFormInitialState] = useState(emptyFormState);

  const handleSubmit = async (
    isValid: boolean,
    data: TodoFormValues
  ): Promise<void> => {
    console.log({ isValid, data });
  };

  const getTodo = (todoId?: string): Optional<WithId<Todo>> => {
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
  };

  useEffect(() => {
    const todo = getTodo(params.todoId);
    if (todo.isPresent()) {
      const values = todo.unwrap();
      setFormInitialState({ content: values.content, done: values.done });
    }
  }, [params.todoId]);

  return (
    <TodoForm
      handleSubmit={handleSubmit}
      initialState={formInitialState}
      validator={validator}
    />
  );
}

export default TodoDetails;
