import React from "react";

const TodoItem = ({ todo, sNo, onDeleteTodo, onToggleTodo }) => (
  <li className={todo.isComplete ? "completed" : null}>
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={todo.isComplete}
        onClick={() => {
          onToggleTodo(todo.id);
        }}
      />
      <label>{`${sNo}. ${todo.name}`}</label>
      <button className="destroy" onClick={() => onDeleteTodo(todo.id)} />
    </div>
  </li>
);

export default props => (
  <ul className="todo-list">
    {props.todos.map((todo, index) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        sNo={index + 1}
        onDeleteTodo={props.onDeleteTodo}
        onToggleTodo={props.onToggleTodo}
      />
    ))}
  </ul>
);
