import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import useTodo from '../useTodo';
import TodoForm, { TodoFormValues } from './form';
import { Modal, useModal } from '../../../components/Modal';

type Params = { todoId: string };

const emptyFormState = { content: '', done: false };

const validator = ({ content }: { content: string }) =>
  (content ?? '').trim().length > 0;

function TodoDetails() {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const modal = useModal(true);
  const { getTodo, saveTodo } = useTodo();

  const [formInitialState, setFormInitialState] = useState(emptyFormState);

  const handleSubmit = async (
    isValid: boolean,
    data: TodoFormValues
  ): Promise<void> => {
    if (isValid) saveTodo(data);
  };

  const onCloseModal = () => {
    modal.close();
    navigate('/');
  };

  useEffect(() => {
    const todo = getTodo(params.todoId);
    if (todo.isPresent()) {
      const values = todo.unwrap();
      setFormInitialState({ content: values.content, done: values.done });
    }
  }, [params.todoId, getTodo]);

  return (
    <Modal isOpen={modal.isOpen} onRequestClose={onCloseModal}>
      <h2>{params.todoId ? 'Update' : 'Add'} todo</h2>
      <TodoForm
        handleSubmit={handleSubmit}
        initialState={formInitialState}
        validator={validator}
      />
    </Modal>
  );
}

export default TodoDetails;
