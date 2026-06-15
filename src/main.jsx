/**
 * @file main.jsx
 * @description Application entry point. Mounts React into `#root` and wraps the app
 *   with global providers before rendering {@link App}.
 *
 * Provider stack (outer → inner):
 *   StrictMode → QueryClientProvider → BrowserRouter → App
 *
 * Side-effect imports (no exports used):
 *   - `./index.css` — global styles, brand tokens, fonts
 *   - `./i18n/config` — registers i18next before any component renders
 *
 * @see App.jsx for routing and feature-level providers
 * @see api/queryClient.js for React Query defaults
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import './index.css';
import './i18n/config';
import { createQueryClient } from './api/queryClient';

const queryClient = createQueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
