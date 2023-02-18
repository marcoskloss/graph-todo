/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import * as api from '../../../api';
import TodoDetails from '.';
import { Optional, WithId } from '../../../types';
import { Todo } from '../../../models';

vi.mock('../../../api');

const doneField = () => screen.getByPlaceholderText(/done/i);
const contentField = () => screen.getByPlaceholderText(/content/i);
const submitButton = () => screen.getByText(/save/i);

const renderWithRouter = (initialRoute = '/todo/') => (
  <MemoryRouter initialEntries={[initialRoute]}>
    <Routes>
      <Route path="/" element={null} />
      <Route path="todo/:todoId?" element={<TodoDetails />} />
    </Routes>
  </MemoryRouter>
);

describe('TodoDetails component', () => {
  afterEach(() => vi.resetAllMocks());

  describe('when updating a todo', () => {
    const todo: WithId<Todo> = {
      id: 'some-id',
      content: 'foobar',
      createdAt: new Date(),
      done: true,
    };

    it('should display the data of the Todo that owns the ID in the url', async () => {
      vi.mocked(api.getTodo).mockReturnValue(Optional.of(todo));
      render(renderWithRouter(`/todo/${todo.id}`));

      expect(contentField()).toHaveValue(todo.content);
      expect(doneField()).toBeChecked();
    });

    it('should allow the user to update the data in the form', async () => {
      vi.mocked(api.getTodo).mockReturnValue(Optional.of(todo));
      render(renderWithRouter(`/todo/${todo.id}`));
      const user = userEvent.setup();

      const newTodoData = {
        content: 'some cool thing that i need to do!',
        done: !todo.done,
      };

      const contentInput = contentField();
      const doneCheckbox = doneField();
      const saveButton = submitButton();

      await user.clear(contentInput);
      await user.type(contentInput, newTodoData.content);

      await user.click(doneCheckbox);
      await user.click(saveButton);

      expect(api.saveTodo).toBeCalledWith(newTodoData);
      expect(screen.queryByText(/add todo/i)).not.toBeInTheDocument();
    });
  });

  describe('when creating a new todo', () => {
    it("should allow to create a new Todo when there's no ID in the url", async () => {
      render(renderWithRouter());
      const user = userEvent.setup();

      const todoData = { content: 'badumtss', done: false };

      const contentInput = contentField();
      await user.type(contentInput, todoData.content);

      const saveButton = submitButton();
      await user.click(saveButton);

      expect(api.saveTodo).toBeCalledWith(todoData);
    });

    it.each(['all god', '        do something     ', 'clean the desk'])(
      'should validate the content length before saving: testing valid content',
      async (content) => {
        render(renderWithRouter());
        expect(screen.getByText(/add todo/i)).toBeInTheDocument();
        const user = userEvent.setup();

        const todoData = { content, done: true };

        const contentInput = contentField();
        await user.type(contentInput, todoData.content);

        const doneCheckbox = doneField();
        await user.click(doneCheckbox);

        const saveButton = submitButton();
        await user.click(saveButton);

        expect(api.saveTodo).toBeCalledWith(todoData);
      }
    );

    it('should validate the content length before saving: testing invalid content', async () => {
      render(renderWithRouter());
      expect(screen.getByText(/add todo/i)).toBeInTheDocument();
      const user = userEvent.setup();

      const saveButton = submitButton();
      await user.click(saveButton);

      expect(api.saveTodo).not.toBeCalled();
      expect(screen.getByText(/add todo/i)).toBeInTheDocument();
      expect(screen.getByText('content must not be empty')).toBeInTheDocument();
    });

    it.each([' ', '              '])(
      'should validate the content length before saving: testing invalid content',
      async (content) => {
        render(renderWithRouter());
        expect(screen.getByText(/add todo/i)).toBeInTheDocument();
        const user = userEvent.setup();

        const todoData = { content, done: true };

        const contentInput = contentField();
        await user.type(contentInput, todoData.content);

        const doneCheckbox = doneField();
        await user.click(doneCheckbox);

        const saveButton = submitButton();
        await user.click(saveButton);

        expect(api.saveTodo).not.toBeCalled();
        expect(screen.getByText(/add todo/i)).toBeInTheDocument();
        expect(
          screen.getByText('content must not be empty')
        ).toBeInTheDocument();
      }
    );

    it('should initialize the form with emtpy values', async () => {
      render(renderWithRouter());
      expect(contentField()).toHaveValue('');
      expect(doneField()).not.toBeChecked();
    });
  });
});
