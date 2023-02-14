import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import Todos from './pages/Todos';
import TodoDetails from './pages/Todos/Details';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Todos />}>
          <Route path="todo/:todoId?" element={<TodoDetails />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
