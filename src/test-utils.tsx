import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { ThemeProvider } from './components/layout/theme-provider';
import { AuthProvider } from './features/auth/auth-context';

interface RenderWithProvidersOptions extends RenderOptions {
  routerProps?: MemoryRouterProps;
}

export function renderWithProviders(ui: ReactElement, options?: RenderWithProvidersOptions) {
  const { routerProps, ...renderOptions } = options ?? {};
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter {...routerProps}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
