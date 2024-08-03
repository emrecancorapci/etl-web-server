import './globals.css';

import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layout';
import Subscriptions from './pages';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <MainLayout>
      <Subscriptions />
    </MainLayout>
  </QueryClientProvider>
);
