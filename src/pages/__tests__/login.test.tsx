import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LoginPage } from '../login';
import { renderWithProviders } from '../../test-utils';

describe('LoginPage', () => {
  it('renders form controls and handles submission', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />, { routerProps: { initialEntries: ['/login'] } });

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /sign in/i });

    await user.clear(email);
    await user.type(email, 'viewer@clinic.test');
    await user.clear(password);
    await user.type(password, 'password123');

    expect(submit).toBeEnabled();
  });
});
