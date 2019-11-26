import React from "react";
import { Link } from "react-router-dom";

export default props => {
  const { todos } = props;
  const total = todos.length;
  const totalCompleted = todos.filter(todo => todo.isComplete).length;
  const totalActive = total - totalCompleted;
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{totalActive}</strong> {totalActive > 1 ? "todos" : "todo"} left
      </span>
      <ul className="filters">
        <li>
          <Link className="all" to="/">
            All
          </Link>
        </li>{" "}
        <li>
          <Link className="active" to="/active">
            Active
          </Link>
        </li>{" "}
        <li>
          <Link className="completed" to="/completed">
            Completed
          </Link>
        </li>
      </ul>
    </footer>
  );
};
