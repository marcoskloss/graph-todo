import { useState, useEffect } from 'react';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

function useFormState<T>(
  initialState: T,
  validator: (data: T) => boolean = () => true
) {
  const [state, setState] = useState(initialState);
  const isValid = validator(state);

  const valueOf = <K extends keyof T>(prop: K): T[K] => state[prop];

  const setValueOf = <V,>(prop: keyof T, value: V) =>
    setState((prevState) => ({ ...prevState, [prop]: value }));

  const onChangeField = (field: keyof T) => (ev: ChangeEvent) =>
    setValueOf(field, ev.target.value);

  useEffect(() => setState(initialState), [initialState]);

  return {
    valueOf,
    setValueOf,
    isValid,
    onChangeField,
  };
}

export type TodoFormValues = {
  content: string;
  done: boolean;
};

type Props = {
  handleSubmit(isValidSubmission: boolean, data: TodoFormValues): Promise<void>;
  validator(data: TodoFormValues): boolean;
  initialState: TodoFormValues;
};

function TodoForm({ handleSubmit, initialState, validator }: Props) {
  const { isValid, valueOf, onChangeField } = useFormState(
    initialState,
    validator
  );

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const values: TodoFormValues = {
      content: valueOf('content'),
      done: valueOf('done'),
    };
    handleSubmit(isValid, values);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="content">
          Content
          <input
            type="text"
            id="content"
            onChange={onChangeField('content')}
            value={valueOf('content')}
          />
        </label>
      </div>
      <div>
        <label htmlFor="done">
          Done
          <input
            type="checkbox"
            id="done"
            onChange={onChangeField('done')}
            checked={valueOf('done')}
          />
        </label>
      </div>

      <button type="submit">Save</button>
    </form>
  );
}

export default TodoForm;
