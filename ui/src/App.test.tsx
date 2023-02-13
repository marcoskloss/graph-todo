import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './pages/Todos';

describe('App component', () => {
  it('counter should start with 0', () => {
    render(<App />);
    expect(
      screen.getByRole('button', { name: 'count is 0' })
    ).toBeInTheDocument();
  });

  it('should increment counter', async () => {
    render(<App />);
    const counterButton = screen.getByRole('button', { name: 'count is 0' });

    await userEvent.click(counterButton);

    expect(
      screen.getByRole('button', { name: 'count is 1' })
    ).toBeInTheDocument();
  });
});
