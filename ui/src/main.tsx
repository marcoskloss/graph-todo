import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Todos from './pages/Todos';
import TodoDetails from './pages/Todos/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Todos />,
    children: [
      {
        path: 'todo/:todoId?',
        element: <TodoDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
