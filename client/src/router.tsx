import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Layout from './layout';
import Subscriptions from './pages/subscription';
import Home from './pages/home';

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />} path="/">
        <Route element={<Home />} index />
        <Route element={<Subscriptions />} path="/subscriptions" />
      </Route>

      <Route element={<div>Not Found</div>} path="*" />
    </>
  )
);
