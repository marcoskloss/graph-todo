import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';

import Todos from './pages/Todos';
import TodoDetails from './pages/Todos/Details';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todos />}>
          <Route path="todo/:todoId?" element={<TodoDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}
