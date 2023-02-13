import { Outlet as OutletTodoDetails, Link } from 'react-router-dom';

function Todos() {
  return (
    <>
      <div>
        <h1>Todo List</h1>
        <Link to="todo">New</Link>
        <div>
          <ul>
            <li>
              <span>some text here...</span>
              <button type="button">Remove</button>
              <Link to="todo/some-todo-id-123">Edit</Link>
            </li>
          </ul>
        </div>
      </div>
      <OutletTodoDetails />
    </>
  );
}

export default Todos;
