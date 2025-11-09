import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './components/layout/theme-provider';
import { AuthProvider } from './features/auth/auth-context';

async function prepareMocks() {
  if (typeof window === 'undefined') return;
  try {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: `${import.meta.env.BASE_URL ?? '/'}mockServiceWorker.js`
      }
    });
  } catch (error) {
    console.warn('Mock service worker failed to start', error);
  }
}

prepareMocks().finally(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});
