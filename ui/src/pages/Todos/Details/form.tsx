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

  const onChangeField = (field: keyof T) => (ev: ChangeEvent) => {
    // eslint-disable-next-line prefer-destructuring
    let value: string | boolean = ev.target.value;

    if (ev.target.type === 'checkbox') {
      value = ev.target.checked;
    }

    setValueOf(field, value);
  };

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
  handleSubmit(data: TodoFormValues): Promise<void>;
  validator(data: TodoFormValues): boolean;
  initialState: TodoFormValues;
};

function TodoForm({ handleSubmit, initialState, validator }: Props) {
  const [error, setError] = useState('');
  const { isValid, valueOf, onChangeField } = useFormState(
    initialState,
    validator
  );

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!isValid) {
      setError('content must not be empty');
      return;
    }

    const values: TodoFormValues = {
      content: valueOf('content'),
      done: valueOf('done'),
    };
    setError('');
    handleSubmit(values);
  };

  return (
    <form onSubmit={onSubmit}>
      {!isValid && (
        <span id="error-msg" style={{ color: 'deeppink' }}>
          {error}
        </span>
      )}
      <div>
        <label htmlFor="content">
          Content
          <input
            type="text"
            id="content"
            aria-errormessage="error-msg"
            placeholder="Content"
            aria-invalid={!isValid}
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
            placeholder="Done"
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
