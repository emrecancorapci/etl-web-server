import './globals.css';

import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layout';
import App from './app';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <Layout>
      <App />
    </Layout>
  </QueryClientProvider>
);
