/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import * as api from '../../../api';
import TodoDetails from '.';
import { Optional } from '../../../types';

vi.mock('../../../api');

const withRouter = (component: ReactNode, initialRoute: string) => (
  <MemoryRouter initialEntries={[initialRoute]}>{component}</MemoryRouter>
);

describe('TodoDetails component', () => {
  afterEach(() => vi.resetAllMocks());

  describe('when updating a todo', () => {
    it.todo('should display the data of the Todo that owns the ID in the url');

    it.todo('should allow the user to update the data in the form');
  });

  describe('when creating a new todo', () => {
    it("should allow to create a new Todo when there's no ID in the url", async () => {
      vi.mocked(api.getTodo).mockReturnValue(Optional.empty() as any);

      render(withRouter(<TodoDetails />, '/todo/'));
      const user = userEvent.setup();

      const todoData = { content: 'badumtss', done: false };

      const contentInput = screen.getByText(/content/i);
      await user.type(contentInput, todoData.content);

      const saveButton = screen.getByText(/save/i);
      await user.click(saveButton);

      expect(screen.getByText(/add todo/i)).toBeInTheDocument();
      expect(api.saveTodo).toBeCalledWith(todoData);
    });

    it.todo('should validate the content length before saving');
  });
});
