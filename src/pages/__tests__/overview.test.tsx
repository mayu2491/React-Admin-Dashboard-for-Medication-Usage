import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OverviewPage } from '../overview';
import { renderWithProviders } from '../../test-utils';
import { axe } from 'vitest-axe';

describe('OverviewPage', () => {
  it('loads metrics and has no obvious accessibility violations', async () => {
    const { container } = renderWithProviders(<OverviewPage />, { routerProps: { initialEntries: ['/overview'] } });

    await waitFor(() => expect(screen.getByText(/total patients/i)).toBeInTheDocument());

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
